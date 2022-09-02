import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';
import { useTranslation } from 'react-i18next';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import dataRu from '../data/audioRu.json';
import dataEn from '../data/audioEn.json';
import { Lang, Modes, Trainers } from '../types/constants';

export const AudioPage = (): JSX.Element => {
  const mode = useAppSelector(({ trainer: { mode } }) => mode);
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const data = lang === Lang.ru ? dataRu : dataEn;
  return mode === Modes.lesson ? (
    <div>
      <h2>{t('audio')}</h2>
      <LessonSelect data={data} type={Trainers.audio} />
      <LessonContent data={data} type={Trainers.audio} />
    </div>
  ) : (
    <TrainResult type={Trainers.audio} data={data} />
  );
};
