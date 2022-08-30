import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { useAppSelector } from './app/hooks/reduxHooks';
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

export const App = (): JSX.Element => {
  const auth = useAppSelector(({ app: { isAuthorized } }) => isAuthorized);
  return (
    <>
      <Header />
      <h1 className="test-title">{auth.toString()}</h1>
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
        </Routes>
        <Sidebar />
      </main>
      <Footer />
    </>
  );
};
