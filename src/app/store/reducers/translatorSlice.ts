import { createSlice } from '@reduxjs/toolkit';

export interface ITranslatorState {
  input: string;
  output: string[] | [];
  language: string | null;
}

const initialState: ITranslatorState = {
  input: '',
  output: [],
  language: null,
};

export const translatorSlice = createSlice({
  name: 'translator',
  initialState,
  reducers: {
    setInput: (state, { payload }) => {
      state.input = payload;
    },
    setOutput: (state, { payload }) => {
      state.output = payload;
    },
    setLanguage: (state, { payload }) => {
      state.language = payload;
    },
  },
});

export const { setInput, setOutput, setLanguage } = translatorSlice.actions;

export default translatorSlice.reducer;
