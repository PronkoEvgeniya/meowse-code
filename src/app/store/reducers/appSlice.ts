import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSmallestUncompletedLesson } from '../../../helpers/getSmallestUncompletedLesson';
import { Lang, LSParameters, TrainersLength } from '../../../types/constants';
import { ILeader } from '../../../types/interfaces';
import { ISetLessonAction } from '../actionTypes';
import { getLeaders, getUser } from '../userRequests';

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
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload: { lessonsAudioEn, lessonsAudioRu, lessonsTextEn, lessonsTextRu } }) => {
          const lang = localStorage.getItem(LSParameters.lang);
          if (lang === Lang.ru) {
            state.audioLesson = lessonsAudioRu
              ? getSmallestUncompletedLesson(JSON.parse(lessonsAudioRu), TrainersLength.audioRU)
              : 1;
            state.textLesson = lessonsTextRu
              ? getSmallestUncompletedLesson(JSON.parse(lessonsTextRu), TrainersLength.textRu)
              : 1;
          } else {
            state.audioLesson = lessonsAudioEn
              ? getSmallestUncompletedLesson(JSON.parse(lessonsAudioEn), TrainersLength.en)
              : 1;
            state.textLesson = lessonsTextEn
              ? getSmallestUncompletedLesson(JSON.parse(lessonsTextEn), TrainersLength.en)
              : 1;
          }
        }
      );
  },
});

export const { setSidebarBtnState, closeSidebar, setLesson, toggleLeadersVisibility } =
  appSlice.actions;

export default appSlice.reducer;
