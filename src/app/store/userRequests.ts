import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ActionTypes, LSParameters, URL } from '../../types/constants';
import {
  IAuthorization,
  IRegistration,
  IAuthError,
  IUser,
  IUpdateUser,
} from '../../types/interfaces';

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
        data: { token, user },
      } = (await axios.post(URL.authorization, userInfo)) as IUser;
      localStorage.setItem(LSParameters.token, token);
      return user;
    } catch (err) {
      return rejectWithValue((err as IAuthError).response.data.message);
    }
  }
);

export const getUser = createAsyncThunk(
  ActionTypes.getUser,
  async (token: string, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = (await axios.get(URL.user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as IUser;
      return user;
    } catch (err) {
      return rejectWithValue((err as IAuthError).response.data.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  ActionTypes.updateUser,
  async ({ token, user }: IUpdateUser, { rejectWithValue }) => {
    try {
      await axios.put(URL.user, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      return rejectWithValue((err as IAuthError).response.data.message);
    }
  }
);
