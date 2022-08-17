import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { useAppDispatch } from './app/hooks/reduxHooks';
import { test } from './app/store/reducers/appSlice';
import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './routes/HomePage';
import { StartPage } from './routes/StartPage';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(test());
  }, [dispatch]);
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
