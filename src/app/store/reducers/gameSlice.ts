import { createSlice } from '@reduxjs/toolkit';
import { Modes } from '../../../types/constants';

export interface IGameState {
  index: number;
  score: number;
  mode: TGameModes;
}

type TGameModes = Modes.rules | Modes.result | Modes.task;

const initialState: IGameState = {
  index: 0,
  score: 0,
  mode: Modes.rules,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    goToTheNextLesson: (state) => {
      state.index += 1;
    },
    incrementScore: (state, { payload }) => {
      state.score += payload;
    },
    resetGame: (state) => {
      state.index = 0;
      state.score = 0;
      state.mode = Modes.rules;
    },
    setTaskMode: (state) => {
      state.mode = Modes.task;
    },
    setResultMode: (state) => {
      state.mode = Modes.result;
    },
  },
});

export const { goToTheNextLesson, incrementScore, resetGame, setTaskMode, setResultMode } =
  gameSlice.actions;

export default gameSlice.reducer;
