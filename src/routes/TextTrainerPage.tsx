import React from 'react';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';

export const TextTrainerPage = (): JSX.Element => {
  const mode = useAppSelector(({ textTrainer: { mode } }) => mode);
  return mode === 'lesson' ? (
    <div>
      <h2>Текстовый тренажер</h2>
      <LessonSelect />
      <LessonContent />
    </div>
  ) : (
    <TrainResult />
  );
};
