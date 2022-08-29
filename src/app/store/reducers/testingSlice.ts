import { createSlice } from '@reduxjs/toolkit';

export interface ITestingState {
  userAnswer: string;
  isCompleted: boolean;
  isAnswerValid: boolean;
  result: number;
}

const initialState: ITestingState = {
  userAnswer: '',
  isCompleted: false,
  isAnswerValid: true,
  result: 0,
};

export const testingSlice = createSlice({
  name: 'testing',
  initialState,
  reducers: {
    setAnswer: (state, { payload }) => {
      state.userAnswer = payload;
    },
    setAnswerValidity: (state, { payload }) => {
      state.isAnswerValid = payload;
    },
    setCompleteness: (state, { payload }) => {
      state.isCompleted = payload;
    },
    setResult: (state, { payload }) => {
      state.result = payload;
    },
  },
});

export const { setAnswer, setAnswerValidity, setCompleteness, setResult } = testingSlice.actions;

export default testingSlice.reducer;
