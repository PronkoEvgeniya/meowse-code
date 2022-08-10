import { createSlice } from '@reduxjs/toolkit';

export interface IAppState {
  value: number;
}

const initialState: IAppState = {
  value: 0,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    test: (state) => {
      console.log(state.value);
    },
  },
});

export const { test } = appSlice.actions;

export default appSlice.reducer;
