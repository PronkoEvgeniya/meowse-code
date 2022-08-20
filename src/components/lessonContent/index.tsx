import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../app/models/interfaces';

enum Error {
  invalidLength = '*ой, проверь длинну введенной строки',
  wrongSymbols = '*ответ может содержать только точки и тире',
}

export const LessonContent = () => {
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const lessons = useAppSelector(({ app: { textData } }) => textData);
  const currentLesson = lessons.length
    ? lessons.find((lesson) => lesson.id === lessonID)
    : { description: '', symbols: [''], code: [''], task: '', id: 0, answer: '' };
  const { description, symbols, code, task, answer } = currentLesson as ILesson;
  const symbolsElements = symbols.map((symbol, i) => (
    <div key={symbol}>
      {symbol}: {code[i]}
    </div>
  ));
  const [isValidAnswer, setIsValidAnswer] = useState<null | boolean>(null);
  const [hasAnotherSymbols, setHasAnotherSymbols] = useState<null | boolean>(null);
  const [isLengthInvalid, setIsLengthInvalid] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const hasSymbols = value.split('').some((symbol) => !/[.-]/.test(symbol));
    setUserAnswer(value);

    if (!value) {
      setIsValidAnswer(null);
      setHasAnotherSymbols(null);
      setIsLengthInvalid(false);
      return;
    }

    if (value.length !== answer.length) {
      setIsValidAnswer(false);
      setIsLengthInvalid(true);
    }

    if (hasSymbols) {
      setIsValidAnswer(false);
      setHasAnotherSymbols(true);
    }

    if (value.length === answer.length) setIsLengthInvalid(false);
    if (!hasSymbols) setHasAnotherSymbols(null);
    if (value.length === answer.length && !hasSymbols) {
      setIsValidAnswer(true);
    }
  };

  const checkAnswer = () => {
    const checkArr = [];
    for (let i = 0; i < answer.length; i += 1) {
      if (answer[i] === userAnswer[i]) checkArr.push(true);
    }
    setUserAnswer('');
    alert(`${Math.round((checkArr.length / answer.length) * 100)}%`);
  };

  return (
    <>
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <textarea placeholder="Ответ" onChange={inputHandler} value={userAnswer}></textarea>
      {hasAnotherSymbols ? <div>{Error.wrongSymbols}</div> : null}
      {isLengthInvalid ? <div>{Error.invalidLength}</div> : null}
      <button type="button" disabled={!isValidAnswer} onClick={checkAnswer}>
        Готово
      </button>
    </>
  );
};
