import { createSlice } from '@reduxjs/toolkit';
import { LSParameters } from '../../../types/constants';
import { authorizeUser, getUser, registerUser, updateUser } from '../userRequests';

export interface IUserState {
  name: string;
  email: string;
  password: string;
  score: number;
  avatar: string | null;
  sertificate: boolean;
  confirmPassword: string;
  isRegistrated: boolean;
  isAuthorized: boolean;
  error: string | null;
}

const initialState: IUserState = {
  name: '',
  email: '',
  password: '',
  score: 0,
  avatar: null,
  sertificate: false,
  confirmPassword: '',
  isRegistrated: false,
  isAuthorized: localStorage.getItem(LSParameters.token) ? true : false,
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
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setAvatar: (state, { payload }) => {
      state.avatar = payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
        state.isRegistrated = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.name = '';
        state.email = '';
        state.password = '';
        state.confirmPassword = '';
      })
      .addCase(
        authorizeUser.fulfilled,
        (state, { payload: { email, name, avatar, score, sertificate } }) => {
          state.error = null;
          state.isAuthorized = true;
          state.name = name;
          state.email = email;
          state.avatar = avatar ? avatar : null;
          state.score = score ? score : 0;
          state.sertificate = sertificate ? true : false;
        }
      )
      .addCase(authorizeUser.rejected, (state, { payload }) => {
        state.error = payload as string;
        state.email = '';
        state.password = '';
      })
      .addCase(
        getUser.fulfilled,
        (state, { payload: { email, name, avatar, score, sertificate } }) => {
          state.isAuthorized = true;
          state.name = name;
          state.email = email;
          state.avatar = avatar ? avatar : null;
          state.score = score ? score : 0;
          state.sertificate = sertificate ? true : false;
        }
      )
      .addCase(getUser.rejected, (state, { payload }) => {
        alert(payload);
      })
      // .addCase(updateUser.fulfilled, (state, { payload }) => {
      // })
      .addCase(updateUser.rejected, (state, { payload }) => {
        alert(payload);
      });
  },
});

export const {
  setAuthorization,
  setName,
  setEmail,
  setAvatar,
  setPassword,
  setConfirmPassword,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
