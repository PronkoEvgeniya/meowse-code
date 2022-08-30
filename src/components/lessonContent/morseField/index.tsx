import React, { useEffect, createRef } from 'react';
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
  const { filledInputs, isFieldsValid, userAnswer, currentInput, completedLessons } =
    useAppSelector(({ textTrainer }) => textTrainer);
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const dispatch = useAppDispatch();
  const redStyle = { border: '5px solid red' };
  const greenStyle = { border: '5px solid green' };
  const completedScore = completedLessons ? completedLessons[lessonID] : 0;
  const handleFieldChange = ({ target: { value, id } }: React.ChangeEvent<HTMLInputElement>) => {
    const trimedValue = value.trim();
    dispatch(setUserAnswer({ [id]: trimedValue }));
    if (trimedValue.length === answer[Number(id)].length) {
      dispatch(setFieldValidity({ [id]: answer[Number(id)] === trimedValue }));
      dispatch(addToFilledInputs(answer[Number(id)] === trimedValue));
      dispatch(setCurrentInput(Number(id) + 1));
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      if (userScore > LessonResults.min || (completedScore && completedScore < userScore)) {
        dispatch(updateCompletedLessons({ id: lessonID, userScore }));
      }
      dispatch(toggleMode());
      dispatch(updateCurrentScore(userScore));
      dispatch(resetLessonState());
    }
  });

  return <form>{inputs}</form>;
};
