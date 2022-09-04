import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import appReducer from './reducers/appSlice';
import translatorReducer from './reducers/translatorSlice';
import trainerReducer from './reducers/trainerSlice';
import testingReducer from './reducers/testingSlice';
import gameReducer from './reducers/gameSlice';
import selectReducer from './reducers/selectSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    translator: translatorReducer,
    trainer: trainerReducer,
    testing: testingReducer,
    game: gameReducer,
    select: selectReducer,
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
