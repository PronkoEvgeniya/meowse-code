import { createSlice } from '@reduxjs/toolkit';
import { LSParameters } from '../../../types/constants';
import { authorizeUser, registerUser } from '../userRequests';

export interface IUserState {
  name: string;
  email: string;
  token: string | null;
  password: string;
  confirmPassword: string;
  isAuthorized: boolean;
  error: string | null;
}

const initialState: IUserState = {
  name: '',
  email: '',
  token: localStorage.getItem(LSParameters.token),
  password: '',
  confirmPassword: '',
  isAuthorized: false,
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

export const { setAuthorization, setName, setEmail, setPassword, setConfirmPassword, setError } =
  userSlice.actions;

export default userSlice.reducer;
