import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICompletedLessons, ICompleteLessonAction } from '../actionTypes';
import { getFromLS, setToLS } from '../../../helpers/localStorageService';
import { Modes, LSParameters } from '../../../types/constants';
// import { getUser } from '../userRequests';

export interface ITextLessonState {
  completedRuTextLessons: null | ICompletedLessons;
  completedEnTextLessons: null | ICompletedLessons;
  completedRuAudioLessons: null | ICompletedLessons;
  completedEnAudioLessons: null | ICompletedLessons;
  mode: Modes.lesson | Modes.result;
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
  completedRuTextLessons: getFromLS<ICompletedLessons>(LSParameters.ruTextLessons, {}),
  completedEnTextLessons: getFromLS<ICompletedLessons>(LSParameters.enTextLessons, {}),
  completedRuAudioLessons: getFromLS<ICompletedLessons>(LSParameters.ruAudioLessons, {}),
  completedEnAudioLessons: getFromLS<ICompletedLessons>(LSParameters.enAudioLessons, {}),
  mode: Modes.lesson,
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
      { payload: { id, userScore, type, lang } }: PayloadAction<ICompleteLessonAction>
    ) => {
      if (type === 'text' && lang === 'ru') {
        state.completedRuTextLessons = { ...state.completedRuTextLessons, [id]: userScore };
        setToLS<ICompletedLessons>(LSParameters.ruTextLessons, state.completedRuTextLessons);
      }
      if (type === 'text' && lang === 'en') {
        state.completedEnTextLessons = { ...state.completedEnTextLessons, [id]: userScore };
        setToLS<ICompletedLessons>(LSParameters.enTextLessons, state.completedEnTextLessons);
      }
      if (type === 'audio' && lang === 'ru') {
        state.completedRuAudioLessons = { ...state.completedRuAudioLessons, [id]: userScore };
        setToLS<ICompletedLessons>(LSParameters.ruAudioLessons, state.completedRuAudioLessons);
      }
      if (type === 'audio' && lang === 'en') {
        state.completedEnAudioLessons = { ...state.completedEnAudioLessons, [id]: userScore };
        setToLS<ICompletedLessons>(LSParameters.enAudioLessons, state.completedEnAudioLessons);
      }
    },
    toggleMode: (state) => {
      state.mode = state.mode === Modes.lesson ? Modes.result : Modes.lesson;
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
  // extraReducers: (builder) => {
  //   builder.addCase(
  //     getUser.fulfilled,
  //     (state, { payload: { lessonsAudioEn, lessonsAudioRu, lessonsTextEn, lessonsTextRu } }) => {
  //       state.completedEnAudioLessons = lessonsAudioEn ? JSON.parse(lessonsAudioEn) : {};
  //       state.completedRuAudioLessons = lessonsAudioRu ? JSON.parse(lessonsAudioRu) : {};
  //       state.completedEnTextLessons = lessonsTextEn ? JSON.parse(lessonsTextEn) : {};
  //       state.completedRuTextLessons = lessonsTextRu ? JSON.parse(lessonsTextRu) : {};
  //     }
  //   );
  // },
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
