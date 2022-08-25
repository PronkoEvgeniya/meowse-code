import { Trans, useTranslation } from 'react-i18next';
import { TrainResultProps } from '../types/interfaces';

export const TrainResult = ({
  answer,
  setAnswer,
  setIsLessonCompleted,
}: TrainResultProps): JSX.Element => {
  const { t } = useTranslation();
  const score = answer.length;

  const againHandler = () => {
    setAnswer('');
    setIsLessonCompleted(false);
  };

  return answer.length > 2 ? (
    <div>
      <p>
        <Trans i18nKey={'winner.description'} values={{ score }}>
          Дай пять, ты набрал <span style={{ color: '#9C56C7' }}>{score}</span>
        </Trans>
      </p>
      <button>{t('winner.nextBtn')}</button>
      <div>маскот</div>
    </div>
  ) : (
    <div>
      <p>{t('looser.description')}</p>
      <button onClick={againHandler}>{t('looser.againBtn')}</button>
      <div>маскот</div>
    </div>
  );
};
