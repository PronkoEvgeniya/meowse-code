/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks';
import { ICompletedLessons } from '../../../app/store/actionTypes';
import {
  addToFilledInputs,
  setUserAnswer,
  resetLessonState,
  toggleMode,
  updateCompletedLessons,
  updateCurrentScore,
  setFieldValidity,
  setCurrentInput,
} from '../../../app/store/reducers/trainerSlice';
import { LessonResults } from '../../../types/constants';

interface IAnswerFieldProps {
  answer: string[];
  score: number;
  type: 'text' | 'audio';
}

export const AnswerField = ({ answer, score, type }: IAnswerFieldProps): JSX.Element => {
  const {
    filledInputs,
    isFieldsValid,
    userAnswer,
    currentInput,
    completedRuTextLessons,
    completedEnTextLessons,
    completedRuAudioLessons,
    completedEnAudioLessons,
  } = useAppSelector(({ trainer }) => trainer);
  const { textLesson, audioLesson } = useAppSelector(({ app: { textLesson, audioLesson } }) => ({
    textLesson,
    audioLesson,
  }));
  const dispatch = useAppDispatch();
  const redStyle = { border: '5px solid red' };
  const greenStyle = { border: '5px solid green' };
  const {
    i18n: { language: lang },
  } = useTranslation();

  let completedLessons: ICompletedLessons | null;
  let completedScore: number;
  let lessonID: number;

  const handleFieldChange = ({ target: { value, id } }: React.ChangeEvent<HTMLInputElement>) => {
    const trimedValue = value.trim().toLowerCase();
    dispatch(setUserAnswer({ [id]: trimedValue }));
    if (trimedValue.length === answer[Number(id)].length) {
      dispatch(setFieldValidity({ [id]: answer[Number(id)] === trimedValue }));
      dispatch(addToFilledInputs(answer[Number(id)] === trimedValue));
      dispatch(setCurrentInput(Number(id) + 1));
    }
  };
  const inputsRefs: React.RefObject<HTMLInputElement>[] = [];
  const inputs = answer.map((letter, i) => {
    const ref: React.RefObject<HTMLInputElement> = createRef();
    inputsRefs.push(ref);
    return (
      <input
        ref={ref}
        key={letter + i}
        id={String(i)}
        type="text"
        required
        style={
          isFieldsValid[String(i)]
            ? greenStyle
            : isFieldsValid[String(i)] === undefined
            ? {}
            : redStyle
        }
        value={userAnswer[i] ? userAnswer[i] : ''}
        readOnly={userAnswer[i] ? userAnswer[i].length === letter.length : false}
        onChange={handleFieldChange}
        autoComplete="off"
      />
    );
  });

  switch (type) {
    case 'audio':
      lessonID = audioLesson;
      completedLessons = lang === 'ru' ? completedRuTextLessons : completedEnTextLessons;
      completedScore = completedLessons ? completedLessons[lessonID] : 0;
      break;
    case 'text':
      lessonID = textLesson;
      completedLessons = lang === 'ru' ? completedRuAudioLessons : completedEnAudioLessons;
      completedScore = completedLessons ? completedLessons[lessonID] : 0;
  }

  useEffect(() => {
    const currentInputRef = inputsRefs[currentInput];
    if (
      currentInputRef &&
      currentInputRef.current &&
      document.activeElement !== currentInputRef.current
    ) {
      const ref = currentInputRef.current as HTMLInputElement;
      ref.focus();
    }
  }, [currentInput, inputsRefs]);

  useEffect(() => {
    if (filledInputs.length === answer.length) {
      const rightAnswers = filledInputs.filter((answer) => answer);
      const userScore = Math.round((rightAnswers.length / answer.length) * score);
      if (
        (!completedScore && userScore >= LessonResults.min) ||
        (completedScore && completedScore < userScore)
      ) {
        dispatch(updateCompletedLessons({ id: lessonID, userScore, type, lang }));
      }
      dispatch(toggleMode());
      dispatch(updateCurrentScore(userScore));
      dispatch(resetLessonState());
    }
  });

  return <form>{inputs}</form>;
};
