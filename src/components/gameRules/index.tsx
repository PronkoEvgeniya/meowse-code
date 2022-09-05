import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setTaskMode } from '../../app/store/reducers/gameSlice';
import cat from '../../assets/images/froggy.png';
import './index.scss';

export const GameRules = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const startGame = () => {
    dispatch(setTaskMode());
  };
  const { t } = useTranslation();
  return (
    <div className="game">
      <h2 className="title">{t('game.title')}</h2>
      <div className="rules">
        <div>{t('game.warning')}</div>
        <div>{t('game.rules.0')}</div>
        <div>{t('game.rules.1')}</div>
        <div>{t('game.rules.2')}</div>
      </div>
      <div className="container">
        <button className="start-btn" onClick={startGame}>
          {t('game.start')}
        </button>
        <div className="mascot">
          <img src={cat} alt="cat" />
        </div>
      </div>
    </div>
  );
};
