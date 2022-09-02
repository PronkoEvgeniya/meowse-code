import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setTaskMode } from '../../app/store/reducers/gameSlice';

export const GameRules = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const startGame = () => {
    dispatch(setTaskMode());
  };
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t('game.title')}</h1>
      <div>{t('game.warning')}</div>
      <div>{t('game.rules.0')}</div>
      <div>{t('game.rules.1')}</div>
      <div>{t('game.rules.2')}</div>
      <button onClick={startGame}>{t('game.start')}</button>
    </div>
  );
};
