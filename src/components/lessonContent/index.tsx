import React from 'react';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../types/interfaces';
import dataRu from '../../data/textRu.json';
import { MorseField } from './morseField';

export const LessonContent = () => {
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const { completedLessons } = useAppSelector(({ textTrainer }) => textTrainer);
  const completedScore = completedLessons ? completedLessons[lessonID] : 0;

  const currentLesson = dataRu.length
    ? dataRu.find((lesson) => lesson.id === lessonID)
    : { description: '', symbols: [''], code: [''], task: '', id: 0, answer: '' };
  const { description, symbols, code, task, answer, score } = currentLesson as ILesson;
  const symbolsElements = symbols.map((symbol, i) => (
    <div key={symbol}>
      {symbol}: {code[i]}
    </div>
  ));

  return (
    <>
      {completedScore ? (
        <div>{`completed (лучший счет - ${completedScore})`}</div>
      ) : (
        <div>not completed</div>
      )}
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <MorseField answer={answer} score={score} />
    </>
  );
};
