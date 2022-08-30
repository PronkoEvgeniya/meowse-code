import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISetLessonAction } from '../actionTypes';

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

export const { setAuthorization, setLesson } = appSlice.actions;

export default appSlice.reducer;
