import React, { useEffect, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import {
  goToTheNextLesson,
  setResultMode,
  incrementScore,
  resetGame,
} from '../../app/store/reducers/gameSlice';
import { Game, Modes } from '../../types/constants';
import { IGameQuestionProps } from '../../types/interfaces';
import { Timer } from '../timer';
import gameCat from '../../assets/images/game-meows.png';
import './index.scss';

export const GameQuestion = ({ questions, date }: IGameQuestionProps): JSX.Element => {
  const [questionID, score, mode] = useAppSelector(({ game: { index, score, mode } }) => [
    index,
    score,
    mode,
  ]);
  const { task, answers } = questions[questionID]
    ? questions[questionID]
    : { task: '', answers: [] };
  const rightRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  const handleTimerEnd = () => {
    dispatch(setResultMode());
  };

  const handleChooseAnswer = ({ target }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id, classList } = target as HTMLButtonElement;

    if (answers[0] === id) {
      classList.add('true');
      setTimeout(() => {
        dispatch(incrementScore(10));
        dispatch(goToTheNextLesson());
      }, 1000);
      return;
    }
    classList.add('false');
    if (rightRef && rightRef.current) {
      const ref = rightRef.current as HTMLButtonElement;
      ref.classList.add('true');
    }
    setTimeout(() => {
      dispatch(goToTheNextLesson());
    }, 1000);
  };

  const buttons = answers
    .map((answer, i) => {
      return (
        <button
          className="answer"
          ref={i === 0 ? rightRef : null}
          key={Math.random() + i}
          id={answer}
          onClick={handleChooseAnswer}
        >
          {answer}
        </button>
      );
    })
    .sort(() => 0.5 - Math.random());

  useEffect(() => {
    if (questionID === questions.length && mode === Modes.task) {
      dispatch(setResultMode());
    }
  }, [questionID, mode, questions.length, dispatch]);

  switch (mode) {
    case Modes.task:
      return (
        <div className="game-container">
          <div className="question">
            <div className="counter">
              <span className="current">{questionID + 1}</span> / {Game.questionAmount}
            </div>
            <div className="score">
              <Trans i18nKey="game.score" values={{ score }} />
            </div>
            <div className="task">{task} ?</div>
            {buttons}
          </div>
          <div className="mascot">
            <div className="timer">
              <Timer initialDate={date} targetMinutes={4} handleTimerEnd={handleTimerEnd} />
            </div>
            <img src={gameCat} alt="cat" />
          </div>
        </div>
      );
    case Modes.result:
      return (
        <div className="game-container">
          <div className="game-result">
            <div className="title">{t('game.end')}</div>
            <div className="score">
              <Trans i18nKey="game.score" values={{ score }} />
            </div>
            <button className="reset" onClick={handleResetGame}>
              {t('game.again')}
            </button>
          </div>
          <div className="mascot">
            <img src={gameCat} alt="cat" />
          </div>
        </div>
      );
  }
  return <div></div>;
};
