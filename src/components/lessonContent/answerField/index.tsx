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
// import { updateUser } from '../../../app/store/userRequests';
// import { getFromLS } from '../../../helpers/localStorageService';
import { Lang, LessonResults, Trainers } from '../../../types/constants';
import { IAnswerFieldProps } from '../../../types/interfaces';
import './index.scss';

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
        className={`field${
          isFieldsValid[String(i)]
            ? ' true'
            : isFieldsValid[String(i)] === undefined
            ? ''
            : ' false'
        }`}
        ref={ref}
        key={letter + i}
        id={String(i)}
        type="text"
        required
        value={userAnswer[i] ? userAnswer[i] : ''}
        readOnly={userAnswer[i] ? userAnswer[i].length === letter.length : false}
        onChange={handleFieldChange}
        autoComplete="off"
      />
    );
  });

  useEffect(() => {
    switch (type) {
      case Trainers.audio:
        lessonID = audioLesson;
        completedLessons = lang === Lang.ru ? completedRuTextLessons : completedEnTextLessons;
        completedScore = completedLessons ? completedLessons[lessonID] : 0;
        break;
      case Trainers.text:
        lessonID = textLesson;
        completedLessons = lang === Lang.ru ? completedRuAudioLessons : completedEnAudioLessons;
        completedScore = completedLessons ? completedLessons[lessonID] : 0;
    }
  }, [type, lang]);

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

  // const findCurrentObjName = () => {
  //   let name = '';
  //   if (lang === Lang.ru) {
  //     name += 'ru';
  //   } else {
  //     name += 'en';
  //   }

  //   if (type === Trainers.text) {
  //     name += 'TextLessons';
  //   } else {
  //     name += 'AudioLessons';
  //   }

  //   return name;
  // };

  useEffect(() => {
    if (filledInputs.length === answer.length) {
      const rightAnswers = filledInputs.filter((answer) => answer);
      const userScore = Math.round((rightAnswers.length / answer.length) * score);
      if (
        (!completedScore && userScore >= LessonResults.min) ||
        (completedScore && completedScore < userScore)
      ) {
        dispatch(updateCompletedLessons({ id: lessonID, userScore, type, lang }));
        // console.log(getFromLS<ICompletedLessons>(findCurrentObjName()));
        // dispatch(updateUser({}))
      }
      dispatch(toggleMode());
      dispatch(updateCurrentScore(userScore));
      dispatch(resetLessonState());
    }
  });

  return <form className="answer">{inputs}</form>;
};
