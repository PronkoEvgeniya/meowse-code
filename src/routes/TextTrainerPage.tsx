// import { TrainResult } from '../components/TrainResult';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import { useTranslation } from 'react-i18next';

export const TextTrainerPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t('text')}</h2>
      <LessonSelect />
      <LessonContent />
      {/* <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={completeHandler}>Отправить</button> */}
    </div>
  );
};
