import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionTypes, LSParameters, URL } from '../../types/constants';
import { IAuthorization, IRegistration, IAuthError, IUser } from '../../types/interfaces';

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
