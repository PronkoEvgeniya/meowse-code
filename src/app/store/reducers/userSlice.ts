import { createSlice } from '@reduxjs/toolkit';
import { LSParameters } from '../../../types/constants';
import { authorizeUser, getUser, registerUser, updateUser } from '../userRequests';

export interface IUserState {
  name: string;
  isValidName: boolean;
  email: string;
  password: string;
  score: number;
  avatar: string | null;
  sertificate: boolean;
  confirmPassword: string;
  isRegistrated: boolean;
  isAuthorized: boolean;
  isFailedToken: boolean;
  error: string | null;
}

const initialState: IUserState = {
  name: '',
  isValidName: true,
  email: '',
  password: '',
  score: 0,
  avatar: null,
  sertificate: false,
  confirmPassword: '',
  isRegistrated: false,
  isAuthorized: localStorage.getItem(LSParameters.token) ? true : false,
  isFailedToken: false,
  error: null,
};

export const userSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setAuthorization: (state, { payload }) => {
      state.isAuthorized = payload;
    },
    setName: (state, { payload }) => {
      state.name = payload;
    },
    setNameValidity: (state, { payload }) => {
      state.isValidName = payload;
    },
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setAvatar: (state, { payload }) => {
      state.avatar = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setScore: (state, { payload }) => {
      state.score = payload;
    },
    setFailedToken: (state) => {
      state.isFailedToken = !state.isFailedToken;
    },
    setPassword: (state, { payload }) => {
      state.password = payload;
    },
    setConfirmPassword: (state, { payload }) => {
      state.confirmPassword = payload;
    },
    setSertificate: (state, { payload }) => {
      state.sertificate = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.isFailedToken = false;
        state.isRegistrated = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      .addCase(
        authorizeUser.fulfilled,
        (state, { payload: { email, name, avatar, score, sertificate } }) => {
          state.error = null;
          state.isAuthorized = true;
          state.name = name;
          state.email = email;
          state.avatar = avatar ? avatar : null;
          state.score = score;
          state.sertificate = sertificate ? true : false;
        }
      )
      .addCase(authorizeUser.rejected, (state, { payload }) => {
        state.error = payload as string;
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload: { email, name, avatar, score, sertificate } }) => {
          state.isAuthorized = true;
          state.name = name;
          state.email = email;
          state.avatar = avatar ? avatar : null;
          state.score = score;
          state.sertificate = sertificate ? true : false;
        }
      )
      .addCase(getUser.rejected, (state) => {
        state.isFailedToken = true;
        state.avatar = null;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isFailedToken = true;
      });
  },
});

export const {
  setAuthorization,
  setName,
  setNameValidity,
  setEmail,
  setAvatar,
  setPassword,
  setConfirmPassword,
  setSertificate,
  setError,
  setScore,
  setFailedToken,
} = userSlice.actions;

export default userSlice.reducer;
