import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILeader } from '../../../types/interfaces';
import { ISetLessonAction } from '../actionTypes';
import { getLeaders } from '../userRequests';

export interface IAppState {
  sidebarBtn: boolean;
  audioLesson: number;
  textLesson: number;
  leaders: ILeader[];
  isVisibleLeaders: boolean;
}

const initialState: IAppState = {
  sidebarBtn: false,
  audioLesson: 1,
  textLesson: 1,
  leaders: [],
  isVisibleLeaders: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSidebarBtnState: (state) => {
      state.sidebarBtn = !state.sidebarBtn;
    },
    closeSidebar: (state) => {
      state.sidebarBtn = false;
    },
    toggleLeadersVisibility: (state) => {
      if (state.isVisibleLeaders) {
        state.leaders = [];
      }
      state.isVisibleLeaders = !state.isVisibleLeaders;
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
  extraReducers: (builder) => {
    builder
      .addCase(getLeaders.fulfilled, (state, { payload }) => {
        state.leaders = payload.filter((leader) => leader.score);
      })
      .addCase(getLeaders.rejected, (state, { payload }) => {
        alert(payload);
      });
  },
});

export const { setSidebarBtnState, closeSidebar, setLesson, toggleLeadersVisibility } =
  appSlice.actions;

export default appSlice.reducer;
