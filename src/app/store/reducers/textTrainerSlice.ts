import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompletedLessons, ICompleteLessonAction } from '../actionTypes';
import { getFromLS, setToLS } from '../../../helpers/localStorageService';

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
  completedLessons: getFromLS<ICompletedLessons>('completedTextTrainerLessons', {}),
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
    updateCompletedLessons: (
      state,
      { payload: { id, userScore } }: PayloadAction<ICompleteLessonAction>
    ) => {
      state.completedLessons = { ...state.completedLessons, [id]: userScore };
      setToLS<ICompletedLessons>('completedTextTrainerLessons', state.completedLessons);
    },
  },
});

export const { setAnswerValidity, setMorseValidity, setUserAnswer, updateCompletedLessons } =
  textTrainerSlice.actions;

export default textTrainerSlice.reducer;
