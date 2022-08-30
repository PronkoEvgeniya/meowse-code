import React from 'react';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';
import dataRu from '../data/textRu.json';

export const TextTrainerPage = (): JSX.Element => {
  const mode = useAppSelector(({ trainer: { mode } }) => mode);
  const { t } = useTranslation();
  return mode === 'lesson' ? (
    <div>
      <h2>{t('text')}</h2>
      <LessonSelect data={dataRu} type="text" />
      <LessonContent data={dataRu} type="text" />
    </div>
  ) : (
    <TrainResult type="text" data={dataRu} />
  );
};
