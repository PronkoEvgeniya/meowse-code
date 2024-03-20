import { createSlice } from '@reduxjs/toolkit';

export interface IGameState {
  isActive: boolean;
}

const initialState = {
  isActive: false,
};

export const selectSlice = createSlice({
  name: 'select',
  initialState,
  reducers: {
    toggleSelect: (state) => {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleSelect } = selectSlice.actions;

export default selectSlice.reducer;
