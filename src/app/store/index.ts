import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
import translatorReducer from './reducers/translatorSlice';
import textTrainerReducer from './reducers/textTrainerSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    translator: translatorReducer,
    textTrainer: textTrainerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
