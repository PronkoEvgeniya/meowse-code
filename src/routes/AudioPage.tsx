import { useAppSelector } from '../app/hooks/reduxHooks';
import { TrainResult } from '../components/TrainResult';
import { useTranslation } from 'react-i18next';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import dataRu from '../data/audioRu.json';

export const AudioPage = (): JSX.Element => {
  const mode = useAppSelector(({ trainer: { mode } }) => mode);
  const { t } = useTranslation();
  return mode === 'lesson' ? (
    <div>
      <h2>{t('text')}</h2>
      <LessonSelect data={dataRu} type="audio" />
      <LessonContent data={dataRu} type="audio" />
    </div>
  ) : (
    <TrainResult type="audio" data={dataRu} />
  );
};
