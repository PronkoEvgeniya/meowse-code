import { createSlice } from '@reduxjs/toolkit';
import { ILesson } from '../../../types/interfaces';

export interface IAppState {
  isAuthorized: boolean;
  audioLesson: number;
  textLesson: number;
  textData: ILesson[] | [];
}

const initialState: IAppState = {
  isAuthorized: false,
  audioLesson: 1,
  textLesson: 1,
  textData: [],
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
    setTextLesson: (state, action) => {
      state.textLesson = action.payload.lesson;
    },
  },
});

export const { setAuthorization, setAudioLesson, setTextLesson } = appSlice.actions;

export default appSlice.reducer;
