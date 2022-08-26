import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setTextLesson } from '../app/store/reducers/appSlice';
import { toggleMode } from '../app/store/reducers/textTrainerSlice';
import { Trans, useTranslation } from 'react-i18next';

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
    const lesson = Number(lessonID) + 1;
    dispatch(setTextLesson({ lesson }));
    dispatch(toggleMode());
    navigate(`/text/${lesson}`);
  };

  return bestScore >= 70 ? (
    <div>
      <p>
        <Trans i18nKey={'winner.description'} values={{ lessonID, currentScore, bestScore }}>
          {
            'Поздравляю, ты прошел урок {{lessonID}} Дай пять, ты набрал {{currentScore}} очков! Пройти уровень ты можешь повторно, а я запомню только твой лучший результат - {{bestScore}}:)'
          }
        </Trans>
      </p>
      <button onClick={handleStartNextLesson}>{t('winner.nextBtn')}</button>
      <div>маскот</div>
    </div>
  ) : (
    <div>
      <p>
        <Trans i18nKey={'looser.description'} values={{ lessonID }}>
          Точность меньше 70%, придется пройти урок № {{ lessonID }} еще раз. Не расстраивайся, у
          меня тоже лапки!
        </Trans>
      </p>
      <button onClick={handleReturnToTheLesson}>{t('looser.againBtn')}</button>
      <div>маскот</div>
    </div>
  );
};
