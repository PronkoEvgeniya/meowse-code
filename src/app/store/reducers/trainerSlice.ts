import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompletedLessons, ICompleteLessonAction } from '../actionTypes';
import { getFromLS, setToLS } from '../../../helpers/localStorageService';
import { TextTrainerPageMode, LSParameters } from '../../../types/constants';

export interface ITextLessonState {
  completedTextLessons: null | ICompletedLessons;
  completedAudioLessons: null | ICompletedLessons;
  mode: TextTrainerPageMode.lesson | TextTrainerPageMode.result;
  currentScore: number;
  currentInput: number;
  filledInputs: string[];
  isFieldsValid: IIsFieldsFalid;
  userAnswer: IUserAnswer;
}

interface IIsFieldsFalid {
  [key: string]: boolean;
}

interface IUserAnswer {
  [key: string]: string;
}

const initialState: ITextLessonState = {
  completedTextLessons: getFromLS<ICompletedLessons>(LSParameters.completedTextLessons, {}),
  completedAudioLessons: getFromLS<ICompletedLessons>(LSParameters.completedAudioLessons, {}),
  mode: TextTrainerPageMode.lesson,
  currentScore: 0,
  currentInput: 0,
  filledInputs: [],
  isFieldsValid: {},
  userAnswer: {},
};

export const trainerSlice = createSlice({
  name: 'trainer',
  initialState,
  reducers: {
    setUserAnswer: (state, { payload }) => {
      state.userAnswer = { ...state.userAnswer, ...payload };
    },
    updateCompletedLessons: (
      state,
      { payload: { id, userScore, type } }: PayloadAction<ICompleteLessonAction>
    ) => {
      switch (type) {
        case 'text':
          state.completedTextLessons = { ...state.completedTextLessons, [id]: userScore };
          setToLS<ICompletedLessons>(LSParameters.completedTextLessons, state.completedTextLessons);
          break;
        case 'audio':
          state.completedAudioLessons = { ...state.completedAudioLessons, [id]: userScore };
          setToLS<ICompletedLessons>(
            LSParameters.completedAudioLessons,
            state.completedAudioLessons
          );
          break;
      }
    },
    toggleMode: (state) => {
      state.mode =
        state.mode === TextTrainerPageMode.lesson
          ? TextTrainerPageMode.result
          : TextTrainerPageMode.lesson;
    },
    updateCurrentScore: (state, { payload }) => {
      state.currentScore = payload;
    },
    setCurrentInput: (state, { payload }) => {
      state.currentInput = payload;
    },
    addToFilledInputs: (state, { payload }) => {
      state.filledInputs = [...state.filledInputs, payload];
    },
    setFieldValidity: (state, { payload }) => {
      state.isFieldsValid = { ...state.isFieldsValid, ...payload };
    },
    resetLessonState: (state) => {
      state.isFieldsValid = {};
      state.filledInputs = [];
      state.userAnswer = {};
      state.currentInput = 0;
    },
  },
});

export const {
  setUserAnswer,
  updateCompletedLessons,
  toggleMode,
  updateCurrentScore,
  setCurrentInput,
  addToFilledInputs,
  setFieldValidity,
  resetLessonState,
} = trainerSlice.actions;

export default trainerSlice.reducer;
