import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { App } from './App';
import './index.scss';
import './i18n';
import { BrowserRouter } from 'react-router-dom';
import { DarkThemeState } from './context/DarkModeContext';

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <DarkThemeState>
        <App />
      </DarkThemeState>
    </Provider>
  </BrowserRouter>
);
