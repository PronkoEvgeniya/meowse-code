import { createSlice } from '@reduxjs/toolkit';

export interface ITextLessonState {
  isAnswerValid: boolean;
  isMorseCode: boolean | null;
  userAnswer: string;
}

const initialState: ITextLessonState = {
  isAnswerValid: false,
  isMorseCode: true,
  userAnswer: '',
};

export const textTrainerSlice = createSlice({
  name: 'textTrainer',
  initialState,
  reducers: {
    setAnswerValidity: (state, { payload }) => {
      state.isAnswerValid = payload;
    },
    setMorseValidity: (state, { payload }) => {
      state.isMorseCode = payload;
    },
    setUserAnswer: (state, { payload }) => {
      state.userAnswer = payload;
    },
  },
});

export const { setAnswerValidity, setMorseValidity, setUserAnswer } = textTrainerSlice.actions;

export default textTrainerSlice.reducer;
