import { createSlice } from '@reduxjs/toolkit';

export interface ITranslatorState {
  input: string;
  output: string;
  codeType: string | null;
}

const initialState: ITranslatorState = {
  input: '',
  output: '',
  codeType: null,
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
    setCodeType: (state, { payload }) => {
      state.codeType = payload;
    },
  },
});

export const { setInput, setOutput, setCodeType } = translatorSlice.actions;

export default translatorSlice.reducer;
