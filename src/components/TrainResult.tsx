import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setLesson } from '../app/store/reducers/appSlice';
import { toggleMode } from '../app/store/reducers/trainerSlice';
import { Trans, useTranslation } from 'react-i18next';
import { ITrainResultProps } from '../types/interfaces';

export const TrainResult = ({ type, data }: ITrainResultProps): JSX.Element => {
  const { textLesson, audioLesson } = useAppSelector(({ app: { textLesson, audioLesson } }) => ({
    textLesson,
    audioLesson,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { completedTextLessons, currentScore, completedAudioLessons } = useAppSelector(
    ({ trainer: { completedAudioLessons, completedTextLessons, currentScore } }) => ({
      completedAudioLessons,
      completedTextLessons,
      currentScore,
    })
  );

  let bestScore = 0;
  let lessonID: number;

  switch (type) {
    case 'text':
      lessonID = textLesson;
      bestScore = completedTextLessons ? completedTextLessons[lessonID] : 0;
      break;
    case 'audio':
      lessonID = audioLesson;
      bestScore = completedAudioLessons ? completedAudioLessons[lessonID] : 0;
  }

  const handleReturnToTheLesson = () => {
    dispatch(toggleMode());
  };

  const handleStartNextLesson = () => {
    let id = 1;
    if (lessonID < data.length) {
      id = Number(lessonID) + 1;
    }
    dispatch(setLesson({ id, type }));
    dispatch(toggleMode());
    navigate(`/${type}/${id}`);
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
          i18nKey={`winner.nextBtn.${lessonID === data.length ? 'lastLesson' : 'usual'}`}
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
