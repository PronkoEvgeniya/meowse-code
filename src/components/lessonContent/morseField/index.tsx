import React, { useRef, useEffect, createRef, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/reduxHooks';
import {
  addToFilledInputs,
  setUserAnswer,
  resetLessonState,
  toggleMode,
  updateCompletedLessons,
  updateCurrentScore,
  setFieldValidity,
  setCurrentInput,
} from '../../../app/store/reducers/textTrainerSlice';
import { LessonResults } from '../../../types/constants';

interface IMorseField {
  answer: string[];
  score: number;
}

export const MorseField = ({ answer, score }: IMorseField): JSX.Element => {
  const { filledInputs, isFieldsValid, userAnswer, currentInput } = useAppSelector(
    ({ textTrainer }) => textTrainer
  );
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const dispatch = useAppDispatch();
  const redStyle = { border: '5px solid red' };
  const greenStyle = { border: '5px solid green' };
  const { completedLessons } = useAppSelector(({ textTrainer }) => textTrainer);
  const completedScore = completedLessons ? completedLessons[lessonID] : 0;
  const formRef = useRef(null);
  const handleFieldChange = ({ target: { value, id } }: React.ChangeEvent<HTMLInputElement>) => {
    const trimedValue = value.trim();
    if (trimedValue.length === answer[Number(id)].length) {
      dispatch(setFieldValidity({ [id]: answer[Number(id)] === trimedValue }));
      dispatch(setUserAnswer({ [id]: trimedValue }));
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
        readOnly={!!userAnswer[String(i)]}
        onChange={handleFieldChange}
        autoComplete="off"
      />
    );
  });

  useEffect(() => {
    const currentInputRef = inputsRefs[currentInput];
    if (
      currentInputRef &&
      currentInputRef.current &&
      document.activeElement !== currentInputRef.current
    ) {
      const ref = currentInputRef.current as HTMLInputElement;
      ref.focus();
      ref.select();
    }
  }, [currentInput, inputsRefs]);

  useEffect(() => {
    if (filledInputs.length === answer.length) {
      const rightAnswers = filledInputs.filter((answer) => answer);
      const userScore = Math.round((rightAnswers.length / answer.length) * score);
      if (!completedScore && userScore > LessonResults.min && completedScore < userScore) {
        dispatch(updateCompletedLessons({ id: lessonID, userScore }));
      }
      dispatch(toggleMode());
      dispatch(updateCurrentScore(userScore));
      dispatch(resetLessonState());
    }
  });

  return <form ref={formRef}>{inputs}</form>;
};
