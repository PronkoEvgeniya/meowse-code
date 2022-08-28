import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompletedLessons, ICompleteLessonAction } from '../actionTypes';
import { getFromLS, setToLS } from '../../../helpers/localStorageService';
import { TextTrainerPageMode, LSParameters } from '../../../types/constants';

export interface ITextLessonState {
  // isAnswerValid: boolean;
  // isMorseCode: boolean | null;
  // userAnswer: string;
  completedLessons: null | ICompletedLessons;
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
  // isAnswerValid: false,
  // isMorseCode: true,
  // userAnswer: '',
  completedLessons: getFromLS<ICompletedLessons>(LSParameters.completedTextLessons, {}),
  mode: TextTrainerPageMode.lesson,
  currentScore: 0,
  currentInput: 0,
  filledInputs: [],
  isFieldsValid: {},
  userAnswer: {},
};

export const textTrainerSlice = createSlice({
  name: 'textTrainer',
  initialState,
  reducers: {
    // setAnswerValidity: (state, { payload }) => {
    //   state.isAnswerValid = payload;
    // },
    // setMorseValidity: (state, { payload }) => {
    //   state.isMorseCode = payload;
    // },
    setUserAnswer: (state, { payload }) => {
      state.userAnswer = { ...state.userAnswer, ...payload };
    },
    updateCompletedLessons: (
      state,
      { payload: { id, userScore } }: PayloadAction<ICompleteLessonAction>
    ) => {
      state.completedLessons = { ...state.completedLessons, [id]: userScore };
      setToLS<ICompletedLessons>(LSParameters.completedTextLessons, state.completedLessons);
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
  // setAnswerValidity,
  // setMorseValidity,
  setUserAnswer,
  updateCompletedLessons,
  toggleMode,
  updateCurrentScore,
  setCurrentInput,
  addToFilledInputs,
  setFieldValidity,
  resetLessonState,
} = textTrainerSlice.actions;

export default textTrainerSlice.reducer;
