import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setLesson } from '../app/store/reducers/appSlice';
import { toggleMode } from '../app/store/reducers/trainerSlice';
import { Trans, useTranslation } from 'react-i18next';
import { ITrainResultProps } from '../types/interfaces';
import { ICompletedLessons } from '../app/store/actionTypes';
import winCat from '../assets/images/win-meows.png';
import looseCat from '../assets/images/loose-meows.png';
import { Lang, Trainers } from '../types/constants';
import './trainResult.scss';

export const TrainResult = ({ type, data }: ITrainResultProps): JSX.Element => {
  const { textLesson, audioLesson } = useAppSelector(({ app: { textLesson, audioLesson } }) => ({
    textLesson,
    audioLesson,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const {
    completedRuAudioLessons,
    completedEnAudioLessons,
    completedRuTextLessons,
    completedEnTextLessons,
    currentScore,
  } = useAppSelector(
    ({
      trainer: {
        completedRuAudioLessons,
        completedEnAudioLessons,
        completedRuTextLessons,
        completedEnTextLessons,
        currentScore,
      },
    }) => ({
      completedRuAudioLessons,
      completedEnAudioLessons,
      completedRuTextLessons,
      completedEnTextLessons,
      currentScore,
    })
  );

  let completedLessons: ICompletedLessons | null;
  let bestScore = 0;
  let lessonID = 1;

  switch (type) {
    case Trainers.text:
      lessonID = textLesson;
      completedLessons = lang === Lang.ru ? completedRuTextLessons : completedEnTextLessons;
      bestScore = completedLessons ? completedLessons[lessonID] : 0;
      break;
    case Trainers.audio:
      lessonID = audioLesson;
      completedLessons = lang === Lang.ru ? completedRuAudioLessons : completedEnAudioLessons;
      bestScore = completedLessons ? completedLessons[lessonID] : 0;
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
    <div className="result">
      <p className="message">
        <Trans
          i18nKey={`winner.description.${currentScore < 70 ? '0' : '1'}`}
          values={{ lessonID, currentScore, bestScore }}
        />
      </p>
      <div className="container">
        <button onClick={handleStartNextLesson} className="restart">
          <Trans
            i18nKey={`winner.nextBtn.${lessonID === data.length ? 'lastLesson' : 'usual'}`}
            values={{ lessonID, currentScore, bestScore }}
          />
        </button>
        <div>
          <img src={winCat} alt="cat" />
        </div>
      </div>
    </div>
  ) : (
    <div className="result">
      <p className="message">
        <Trans i18nKey={'looser.description'} values={{ lessonID }} />
      </p>
      <button className="restart" onClick={handleReturnToTheLesson}>
        {t('looser.againBtn')}
      </button>
      <div>
        <img src={looseCat} alt="cat" />
      </div>
    </div>
  );
};
