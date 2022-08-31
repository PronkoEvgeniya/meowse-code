import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';
import { useTranslation } from 'react-i18next';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import dataRu from '../data/audioRu.json';
import dataEn from '../data/audioEn.json';
import { Lang } from '../types/constants';

export const AudioPage = (): JSX.Element => {
  const mode = useAppSelector(({ trainer: { mode } }) => mode);
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const data = lang === Lang.ru ? dataRu : dataEn;
  return mode === 'lesson' ? (
    <div>
      <h2>{t('audio')}</h2>
      <LessonSelect data={data} type="audio" />
      <LessonContent data={data} type="audio" />
    </div>
  ) : (
    <TrainResult type="audio" data={data} />
  );
};
