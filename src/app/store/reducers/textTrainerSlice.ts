import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompleteLessonAction, ICompletedLessons } from '../actionTypes';

export interface ITextLessonState {
  isAnswerValid: boolean;
  isMorseCode: boolean | null;
  userAnswer: string;
  completedLessons: null | ICompletedLessons;
}

const initialState: ITextLessonState = {
  isAnswerValid: false,
  isMorseCode: true,
  userAnswer: '',
  completedLessons: null,
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
    completeLesson: (state, { payload: { id, score } }: PayloadAction<ICompleteLessonAction>) => {
      if (state.completedLessons) {
        state.completedLessons[id] =
          state.completedLessons[id] > score ? state.completedLessons[id] : score;
      } else {
        state.completedLessons = { [id]: score };
      }
      return state;
    },
    setCompletedLessons: (state, { payload }: PayloadAction<ICompletedLessons>) => {
      state.completedLessons = payload;
    }
  },
});

export const { setAnswerValidity, setMorseValidity, setUserAnswer, completeLesson, setCompletedLessons } = textTrainerSlice.actions;

export default textTrainerSlice.reducer;
