import React, { useEffect } from 'react';
import './App.scss';
import { useAppDispatch } from './app/hooks/reduxHooks';
import { test } from './app/store/reducers/appSlice';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(test());
  }, [dispatch]);
  return (
    <>
      <header></header>
      <main></main>
      <footer></footer>
    </>
  );
};
