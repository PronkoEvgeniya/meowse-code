import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { useAppDispatch, useAppSelector } from './app/hooks/reduxHooks';
import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Sidebar } from './components/sidebar/Sidebar';
import { AboutPage } from './routes/about/AboutPage';
import { AudioPage } from './routes/AudioPage';
import { HomePage } from './routes/HomePage';
import { StartPage } from './routes/StartPage';
import { TranslatePage } from './routes/translatePage/TranslatePage';
import { TextTrainerPage } from './routes/TextTrainerPage';
import { TutorialPage } from './routes/tutorialPage/TutorialPage';
import { TestPage } from './routes/TestPage';
import { GamePage } from './routes/GamePage';
import { AccountPage } from './routes/AccountPage';
import { NotFound } from './routes/NotFound';
import { getUser } from './app/store/userRequests';
import { LSParameters } from './types/constants';
import { GuardedRoute } from './components/guardedRoute';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(LSParameters.token);
  const auth = useAppSelector(({ user }) => user.isAuthorized);
  const isRegistrated = useAppSelector(({ user }) => user.isRegistrated);

  useEffect(() => {
    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch, token]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route
            path="/tutorial"
            element={
              <GuardedRoute auth={isRegistrated}>
                <TutorialPage />
              </GuardedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <GuardedRoute auth={auth}>
                <HomePage />
              </GuardedRoute>
            }
          />
          <Route
            path="/audio/:id"
            element={
              <GuardedRoute auth={auth}>
                <AudioPage />
              </GuardedRoute>
            }
          />
          <Route
            path="/text/:id"
            element={
              <GuardedRoute auth={auth}>
                <TextTrainerPage />
              </GuardedRoute>
            }
          />
          <Route
            path="/game"
            element={
              <GuardedRoute auth={auth}>
                <GamePage />
              </GuardedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <GuardedRoute auth={auth}>
                <TestPage />
              </GuardedRoute>
            }
          />
          <Route
            path="/translate"
            element={
              <GuardedRoute auth={auth}>
                <TranslatePage />
              </GuardedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <GuardedRoute auth={auth}>
                <AccountPage />
              </GuardedRoute>
            }
          />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to={'/404'} />} />
        </Routes>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};
