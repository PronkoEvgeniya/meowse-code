import { useContext, useEffect } from 'react';
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
import { ReauthorizePopup } from './components/ReauthorizePopup';
import { useClear } from './app/hooks/useClear';
import { DarkThemeContext } from './context/DarkModeContext';

export const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const clear = useClear();
  const token = localStorage.getItem(LSParameters.token);
  const auth = useAppSelector(({ user }) => user.isAuthorized);
  const isFailedToken = useAppSelector(({ user }) => user.isFailedToken);
  const isRegistrated = useAppSelector(({ user }) => user.isRegistrated);
  const { darkTheme } = useContext(DarkThemeContext);

  useEffect(() => {
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (isFailedToken) {
      clear();
    }
  }, [clear, isFailedToken]);

  return (
    <div className={darkTheme ? 'html-wrapper dark' : 'html-wrapper'}>
      <div className={darkTheme ? 'body dark' : 'body'}>
        {isFailedToken && <ReauthorizePopup />}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route
              path="/tutorial"
              element={<GuardedRoute component={TutorialPage} auth={isRegistrated} />}
            />
            <Route path="/home" element={<GuardedRoute component={HomePage} auth={auth} />} />
            <Route path="/audio/:id" element={<GuardedRoute component={AudioPage} auth={auth} />} />
            <Route
              path="/text/:id"
              element={<GuardedRoute component={TextTrainerPage} auth={auth} />}
            />
            <Route path="/game" element={<GuardedRoute component={GamePage} auth={auth} />} />
            <Route path="/test" element={<GuardedRoute component={TestPage} auth={auth} />} />
            <Route
              path="/translate"
              element={<GuardedRoute component={TranslatePage} auth={auth} />}
            />
            <Route path="/account" element={<GuardedRoute component={AccountPage} auth={auth} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to={'/404'} />} />
          </Routes>
          <Sidebar />
        </main>
        <Footer />
      </div>
    </div>
  );
};
