import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  value: number;
  audioLesson: number;
  textLesson: number;
}

const initialState: IAppState = {
  value: 0,
  audioLesson: 1,
  textLesson: 1,
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
  },
});

export const { setAudioLesson, setTextLesson } = appSlice.actions;

export default appSlice.reducer;
