import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks/reduxHooks';
import { setAuthorization } from './app/store/reducers/userSlice';
import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Sidebar } from './components/Sidebar';
import { AboutPage } from './routes/about/AboutPage';
import { AudioPage } from './routes/AudioPage';
import { HomePage } from './routes/HomePage';
import { StartPage } from './routes/StartPage';
import { TranslatePage } from './routes/TranslatePage';
import { TextTrainerPage } from './routes/TextTrainerPage';
import { TutorialPage } from './routes/TutorialPage';
import { TestPage } from './routes/TestPage';
import { GamePage } from './routes/GamePage';
import { AccountPage } from './routes/AccountPage';
import { NotFound } from './routes/NotFound';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(({ user }) => user.token);

  useEffect(() => {
    if (token) {
      dispatch(setAuthorization(true));
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/audio/:id" element={<AudioPage />} />
          <Route path="/text/:id" element={<TextTrainerPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};
