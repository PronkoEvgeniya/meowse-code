import { createContext, useState } from 'react';
import { Theme } from '../types/constants';

interface IDarkTheme {
  darkTheme: boolean;
  toggleTheme?: () => void;
}

export const DarkThemeContext = createContext<IDarkTheme>({
  darkTheme: localStorage.getItem(Theme.theme) === Theme.dark,
});

export const DarkThemeState = ({ children }: { children: React.ReactNode }) => {
  const theme = localStorage.getItem(Theme.theme) === Theme.dark;
  const [darkTheme, setDarkTheme] = useState(theme);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    const mode = darkTheme ? Theme.light : Theme.dark;
    localStorage.setItem(Theme.theme, mode);
  };

  return (
    <DarkThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </DarkThemeContext.Provider>
  );
};
