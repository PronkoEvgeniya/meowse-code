import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { GameQuestion } from '../components/gameQuestion';
import { GameRules } from '../components/gameRules';
import { getGameQuestions } from '../helpers/getGameQuestions';
import { Modes } from '../types/constants';
import { resetGame } from '../app/store/reducers/gameSlice';

export const GamePage = (): JSX.Element => {
  const {
    i18n: { language: lang },
  } = useTranslation();
  const mode = useAppSelector(({ game: { mode } }) => mode);
  const questions = getGameQuestions(15, 4, lang);
  const date = Date.now();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(resetGame());
  }, [dispatch]);
  return mode === Modes.rules ? <GameRules /> : <GameQuestion questions={questions} date={date} />;
};
