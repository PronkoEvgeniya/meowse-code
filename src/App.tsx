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
import { TutorialPage } from './routes/TutorialPage';

export const App = (): JSX.Element => {
  const auth = useAppSelector(({ app: { isAuthorized } }) => isAuthorized);
  return (
    <>
      <Header />
      <h1>{auth.toString()}</h1>
      <main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/tutorial" element={<TutorialPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/audio/:id" element={<AudioPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
