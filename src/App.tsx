import { Routes, Route } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { Header } from './components/header/Header';
import { Sidebar } from './components/Sidebar';
import { AboutPage } from './routes/about/AboutPage';
import { AudioPage } from './routes/AudioPage';
import { HomePage } from './routes/HomePage';
import { StartPage } from './routes/StartPage';
import { TranslatePage } from './routes/TranslatePage';
import { TextTrainerPage } from './routes/TextTrainerPage';

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/audio/:id" element={<AudioPage />} />
          <Route path="/text/:id" element={<TextTrainerPage />} />
          <Route path="/translate" element={<TranslatePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};
