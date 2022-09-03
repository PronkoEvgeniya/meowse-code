import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetLessonAction } from '../actionTypes';

export interface IAppState {
  audioLesson: number;
  textLesson: number;
}

const initialState: IAppState = {
  audioLesson: 1,
  textLesson: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLesson: (state, { payload: { id, type } }: PayloadAction<ISetLessonAction>) => {
      switch (type) {
        case 'text':
          state.textLesson = id;
          break;
        case 'audio':
          state.audioLesson = id;
      }
    },
  },
});

export const { setLesson } = appSlice.actions;

export default appSlice.reducer;
