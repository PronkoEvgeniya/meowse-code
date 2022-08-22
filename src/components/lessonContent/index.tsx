import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../types/interfaces';
import data from '../../data/text.json';
import {
  setUserAnswer,
  setAnswerValidity,
  setMorseValidity,
} from '../../app/store/reducers/textTrainerSlice';
import { TextAreaMessages } from '../../types/constants';

export const LessonContent = () => {
  const dispatch = useAppDispatch();
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const { isAnswerValid, isMorseCode, userAnswer } = useAppSelector(
    ({ textTrainer }) => textTrainer
  );

  const currentLesson = data.length
    ? data.find((lesson) => lesson.id === lessonID)
    : { description: '', symbols: [''], code: [''], task: '', id: 0, answer: '' };
  const { description, symbols, code, task, answer } = currentLesson as ILesson;
  const symbolsElements = symbols.map((symbol, i) => (
    <div key={symbol}>
      {symbol}: {code[i]}
    </div>
  ));

  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regExp = new RegExp(TextAreaMessages.lettersRegExp);
    const isMorse = value.split(' ').every((symbol) => {
      if (symbol) return regExp.test(symbol);
      return true;
    });

    dispatch(setUserAnswer(value));

    if (!value) {
      dispatch(setAnswerValidity(false));
      dispatch(setMorseValidity(true));
      return;
    }

    if (!isMorse) {
      dispatch(setAnswerValidity(false));
      dispatch(setMorseValidity(false));
      return;
    }

    if (isMorse) {
      dispatch(setAnswerValidity(true));
      dispatch(setMorseValidity(true));
    }
  };

  const checkAnswer = () => {
    const checkArr = [];
    const userAnswerArr = userAnswer.trim().split(' ');
    for (let i = 0; i < answer.length; i += 1) {
      if (answer[i] === userAnswerArr[i]) checkArr.push(true);
    }
    dispatch(setUserAnswer(''));
    alert(`${Math.round((checkArr.length / answer.length) * 100)}%`);
  };

  return (
    <>
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <textarea placeholder="Ответ" onChange={inputHandler} value={userAnswer}></textarea>
      {isMorseCode ? null : <div title={TextAreaMessages.rulesTitle}>{TextAreaMessages.error}</div>}
      <button type="button" disabled={!isAnswerValid} onClick={checkAnswer}>
        Готово
      </button>
    </>
  );
};
