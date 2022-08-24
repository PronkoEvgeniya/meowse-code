import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  isAuthorized: boolean;
  audioLesson: number;
  textLesson: number;
}

const initialState: IAppState = {
  isAuthorized: false,
  audioLesson: 1,
  textLesson: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthorization: (state, action) => {
      state.isAuthorized = action.payload.auth;
    },
    setAudioLesson: (state, action) => {
      state.audioLesson = action.payload.lesson;
    },
    setTextLesson: (state, { payload }) => {
      state.textLesson = payload.lesson;
    },
  },
});

export const { setAuthorization, setAudioLesson, setTextLesson } = appSlice.actions;

export default appSlice.reducer;
