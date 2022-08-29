import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setTextLesson } from '../app/store/reducers/appSlice';
import { toggleMode } from '../app/store/reducers/textTrainerSlice';
import { Trans, useTranslation } from 'react-i18next';
import dataRu from '../data/textRu.json';

export const TrainResult = (): JSX.Element => {
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { completedLessons, currentScore } = useAppSelector(({ textTrainer }) => textTrainer);
  const bestScore = completedLessons ? completedLessons[lessonID] : 0;

  const handleReturnToTheLesson = () => {
    dispatch(toggleMode());
  };

  const handleStartNextLesson = () => {
    let lesson = 1;
    if (lessonID < dataRu.length) {
      lesson = Number(lessonID) + 1;
    }
    dispatch(setTextLesson({ lesson }));
    dispatch(toggleMode());
    navigate(`/text/${lesson}`);
  };

  return bestScore >= 70 ? (
    <div>
      <p>
        <Trans
          i18nKey={`winner.description.${currentScore < 70 ? '0' : '1'}`}
          values={{ lessonID, currentScore, bestScore }}
        />
      </p>
      <button onClick={handleStartNextLesson}>
        <Trans
          i18nKey={`winner.nextBtn.${lessonID === dataRu.length ? 'lastLesson' : 'usual'}`}
          values={{ lessonID, currentScore, bestScore }}
        />
      </button>
      <div>маскот</div>
    </div>
  ) : (
    <div>
      <p>
        <Trans i18nKey={'looser.description'} values={{ lessonID }} />
      </p>
      <button onClick={handleReturnToTheLesson}>{t('looser.againBtn')}</button>
      <div>маскот</div>
    </div>
  );
};
