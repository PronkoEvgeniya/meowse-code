import { createSlice } from '@reduxjs/toolkit';
import { ILesson } from '../../models/interfaces';

export interface IAppState {
  value: number;
  audioLesson: number;
  textLesson: number;
  textData: ILesson[] | [];
}

const initialState: IAppState = {
  value: 0,
  audioLesson: 1,
  textLesson: 1,
  textData: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAudioLesson: (state, action) => {
      state.audioLesson = action.payload.lesson;
    },
    setTextLesson: (state, action) => {
      state.textLesson = action.payload.lesson;
    },
    setTextData: (state, action) => {
      state.textData = action.payload.data;
    },
  },
});

export const { setAudioLesson, setTextLesson, setTextData } = appSlice.actions;

export default appSlice.reducer;
