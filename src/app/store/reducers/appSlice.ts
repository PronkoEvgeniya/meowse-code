import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetLessonAction } from '../actionTypes';

export interface IAppState {
  sidebarBtn: boolean;
  audioLesson: number;
  textLesson: number;
}

const initialState: IAppState = {
  sidebarBtn: false,
  audioLesson: 1,
  textLesson: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarBtnState: (state) => {
      state.sidebarBtn = !state.sidebarBtn;
    },
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

export const { setSidebarBtnState, setLesson } = appSlice.actions;

export default appSlice.reducer;
