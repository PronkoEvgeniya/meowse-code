import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionTypes, LSParameters, URL } from '../../../types/constants';
import { IAuthorization, IRegistration, IAuthError, IUser } from '../../../types/interfaces';
import { ISetLessonAction } from '../actionTypes';

export const registerUser = createAsyncThunk(
  ActionTypes.registration,
  async (userInfo: IRegistration, { rejectWithValue }) => {
    try {
      await axios.post(URL.registration, userInfo);
    } catch (err) {
      return rejectWithValue((err as IAuthError).response.data.message);
    }
  }
);

export const authorizeUser = createAsyncThunk(
  ActionTypes.authorization,
  async (userInfo: IAuthorization, { rejectWithValue }) => {
    try {
      const {
        data: {
          token,
          user: { name },
        },
      } = (await axios.post(URL.authorization, userInfo)) as IUser;
      localStorage.setItem(LSParameters.token, token);
      return name;
    } catch (err) {
      return rejectWithValue((err as IAuthError).response.data.message);
    }
  }
);

export interface IAppState {
  name: string;
  email: string;
  token: string | null;
  password: string;
  confirmPassword: string;
  isAuthorized: boolean;
  error: string | null;
  audioLesson: number;
  textLesson: number;
}

const initialState: IAppState = {
  name: '',
  email: '',
  token: localStorage.getItem(LSParameters.token),
  password: '',
  confirmPassword: '',
  isAuthorized: false,
  error: null,
  audioLesson: 1,
  textLesson: 1,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthorization: (state, { payload }) => {
      state.isAuthorized = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setConfirmPassword: (state, { payload }) => {
      state.confirmPassword = payload;
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
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.isAuthorized = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.name = '';
        state.email = '';
        state.password = '';
        state.confirmPassword = '';
      })
      .addCase(authorizeUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.name = payload as string;
        state.isAuthorized = true;
      })
      .addCase(authorizeUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.email = '';
        state.password = '';
      });
  },
});

export const {
  setAuthorization,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setLesson,
  setError,
} = appSlice.actions;

export default appSlice.reducer;
