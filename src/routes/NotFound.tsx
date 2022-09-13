import './notFound.scss';
import mascot from '../assets/images/scared-meows.png';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import { DarkThemeContext } from '../context/DarkModeContext';

export const NotFound = (): JSX.Element => {
  const { t } = useTranslation();
  const { darkTheme } = useContext(DarkThemeContext);

  return (
    <div className="not-found__page">
      <img src={mascot} alt="" />
      <p className={darkTheme ? 'notfound__text dark' : 'notfound__text'}>{t('notfound')}</p>
    </div>
  );
};
