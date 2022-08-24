import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../types/interfaces';
import data from '../../data/text.json';
import {
  setUserAnswer,
  setAnswerValidity,
  setMorseValidity,
  completeLesson,
  setCompletedLessons,
} from '../../app/store/reducers/textTrainerSlice';
import { TextAreaMessages } from '../../types/constants';
import { getFromLS, setToLS } from '../../helpers/localStorageService';

export const LessonContent = () => {
  const dispatch = useAppDispatch();
  const lessonID = useAppSelector(
    ({ app: { textLesson } }) => textLesson
  );
  const { isAnswerValid, isMorseCode, userAnswer, completedLessons } = useAppSelector(
    ({ textTrainer }) => textTrainer
  );

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

  const handleButtonClick = () => {
    const checkArr = [];
    const userAnswerArr = userAnswer.trim().split(' ');
    for (let i = 0; i < answer.length; i += 1) {
      if (answer[i] === userAnswerArr[i]) checkArr.push(true);
    }
    const userPersentage = Math.round((checkArr.length / answer.length) * 100);
    const userScore = Math.round((checkArr.length / answer.length) * score);
    dispatch(setUserAnswer(''));
    dispatch(completeLesson({ id: lessonID, score: userScore }));
    alert(`${userPersentage}%`);
  };

  useEffect(() => {
    dispatch(setUserAnswer(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  useEffect(() => {
    if (!completedLessons) {
      const completedLessonsFromLS = getFromLS('completedTextTrainerLessons');
      const completedLessons = completedLessonsFromLS
        ? JSON.parse(completedLessonsFromLS)
        : completedLessonsFromLS;
      dispatch(setCompletedLessons(completedLessons));
      return;
    }
    setToLS('completedTextTrainerLessons', completedLessons);
  }, [completedLessons]);

  return (
    <>
      {completedLessons ? (
        <div>{`completed (лучший счет - ${completedLessons[lessonID]})`}</div>
      ) : (
        <div>not completed</div>
      )}
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <textarea placeholder="Ответ" onChange={inputHandler} value={userAnswer}></textarea>
      {isMorseCode ? null : <div title={TextAreaMessages.rulesTitle}>{TextAreaMessages.error}</div>}
      <button type="button" disabled={!isAnswerValid} onClick={handleButtonClick}>
        Готово
      </button>
    </>
  );
};
