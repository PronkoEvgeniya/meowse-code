import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../types/interfaces';
import data from '../../data/text.json';
import {
  setUserAnswer,
  setAnswerValidity,
  setMorseValidity,
  updateCompletedLessons,
} from '../../app/store/reducers/textTrainerSlice';
import { TextAreaMessages } from '../../types/constants';
import { Highlight } from '../highlight';

export const LessonContent = () => {
  const dispatch = useAppDispatch();
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const { isMorseCode, userAnswer, completedLessons } = useAppSelector(
    ({ textTrainer }) => textTrainer
  );
  const completedScore = completedLessons ? completedLessons[lessonID] : -1;

  const currentLesson = data.length
    ? data.find((lesson) => lesson.id === lessonID)
    : { description: '', symbols: [''], code: [''], task: '', id: 0, answer: '' };
  const { description, symbols, code, task, answer, score } = currentLesson as ILesson;
  const symbolsElements = symbols.map((symbol, i) => (
    <div key={symbol}>
      {symbol}: {code[i]}
    </div>
  ));

  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const regExp = new RegExp(TextAreaMessages.lettersRegExp);
    const splitedAnswer = value.split(' ');
    const isMorse = splitedAnswer.every((symbol) => {
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

  useEffect(() => {
    dispatch(setUserAnswer(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  useEffect(() => {
    const regExp = /[.-\s]/;
    const splitedAnswer = userAnswer.split(' ');
    const joinedAnswer = splitedAnswer.join('');
    const joined = answer.join('');
    const isMorse = splitedAnswer.every((symbol) => {
      if (symbol) return regExp.test(symbol);
      return true;
    });
    if (joinedAnswer.length === joined.length && isMorse) {
      const checkArr = [];
      const userAnswerArr = userAnswer.trim().split(' ');
      for (let i = 0; i < answer.length; i += 1) {
        if (answer[i] === userAnswerArr[i]) checkArr.push(true);
      }
      const userPersentage = Math.round((checkArr.length / answer.length) * 100);
      const userScore = Math.round((checkArr.length / answer.length) * score);
      dispatch(setUserAnswer(''));
      if (completedScore < userScore) dispatch(updateCompletedLessons({ id: lessonID, userScore }));
      alert(`${userPersentage}%`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAnswer]);

  return (
    <>
      {completedScore >= 0 ? (
        <div>{`completed (лучший счет - ${completedScore}`}</div>
      ) : (
        <div>not completed</div>
      )}
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <textarea placeholder="Ответ" onChange={inputHandler} value={userAnswer}></textarea>
      {isMorseCode ? null : <div title={TextAreaMessages.rulesTitle}>{TextAreaMessages.error}</div>}
      <div>
        {userAnswer.split('').map((symbol) => {
          switch (symbol) {
            case '.':
            case '-':
            case ' ':
              return <Highlight isValid={true} symbol={symbol} />;
            default:
              return <Highlight isValid={false} symbol={symbol} />;
          }
        })}
      </div>
    </>
  );
};
