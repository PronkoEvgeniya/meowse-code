import React from 'react';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';
import dataRu from '../data/textRu.json';
import dataEn from '../data/textEn.json';
import './trainerPage.scss';
import { Lang, Modes, Trainers } from '../types/constants';

export const TextTrainerPage = (): JSX.Element => {
  const mode = useAppSelector(({ trainer: { mode } }) => mode);
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const data = lang === Lang.ru ? dataRu : dataEn;
  return mode === Modes.lesson ? (
    <div className="trainer">
      <h2 className="title">{t('text')}</h2>
      <LessonSelect data={data} type={Trainers.text} />
      <LessonContent data={data} type={Trainers.text} />
    </div>
  ) : (
    <TrainResult type={Trainers.text} data={data} />
  );
};
