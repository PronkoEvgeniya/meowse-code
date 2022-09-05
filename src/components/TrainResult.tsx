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

  const completedLessons: ICompletedLessons | null =
    lang === Lang.ru && type === Trainers.text
      ? completedRuTextLessons
      : lang === Lang.en && type === Trainers.text
      ? completedEnTextLessons
      : lang === Lang.ru && type === Trainers.audio
      ? completedRuAudioLessons
      : completedEnAudioLessons;
  const lessonID: number = type === Trainers.audio ? audioLesson : textLesson;

  const bestScore = completedLessons ? completedLessons[lessonID] : 0;

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
        <img src={winCat} alt="cat" className="mascot"/>
      </div>
    </div>
  ) : (
    <div className="result">
      <p className="message">
        <Trans i18nKey={'looser.description'} values={{ lessonID }} />
      </p>
      <div className="container">
        <button className="restart" onClick={handleReturnToTheLesson}>
          {t('looser.againBtn')}
        </button>
        <img src={looseCat} alt="cat" className="mascot" />
      </div>
    </div>
  );
};
