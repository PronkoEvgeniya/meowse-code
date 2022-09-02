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
    const { style, id } = target as HTMLButtonElement;

    if (answers[0] === id) {
      style.backgroundColor = 'lightgreen';
      setTimeout(() => {
        dispatch(incrementScore(10));
        dispatch(goToTheNextLesson());
      }, 1000);
      return;
    }
    style.backgroundColor = 'red';
    if (rightRef && rightRef.current) {
      const ref = rightRef.current as HTMLButtonElement;
      ref.style.backgroundColor = 'lightgreen';
    }
    setTimeout(() => {
      dispatch(goToTheNextLesson());
    }, 1000);
  };

  const buttons = answers
    .map((answer, i) => {
      return (
        <button
          ref={i === 0 ? rightRef : null}
          key={Math.random() + i}
          id={answer}
          onClick={handleChooseAnswer}
          style={{ margin: '10px', minWidth: '70px', padding: '5px' }}
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
        <div>
          <Timer initialDate={date} targetMinutes={4} handleTimerEnd={handleTimerEnd} />
          <div>
            {questionID + 1} / {Game.questionAmount}
          </div>
          <div>
            <Trans i18nKey="game.score" values={{ score }} />
          </div>
          <div> {task} ?</div>
          {buttons}
        </div>
      );
    case Modes.result:
      return (
        <div>
          <div>{t('game.end')}</div>
          <div>
            <Trans i18nKey="game.score" values={{ score }} />
          </div>
          <button onClick={handleResetGame}>{t('game.again')}</button>
        </div>
      );
  }
  return <div></div>;
};
