import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { IconLogo, IconLightTheme, IconDarkTheme } from '../../assets/Sprite';
import { Lang } from '../../types/constants';
import { User } from './User';
import { UserIcon } from './UserIcon';
import './header.scss';
import { useContext } from 'react';
import { DarkThemeContext } from '../../context/DarkModeContext';
import { closeSidebar } from '../../app/store/reducers/appSlice';

export const Header = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { darkTheme, toggleTheme } = useContext(DarkThemeContext);
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const auth = useAppSelector(({ user: { isAuthorized } }) => isAuthorized);

  const toggleLang = () => {
    if (language === Lang.ru) {
      changeLanguage(Lang.en);
    } else {
      changeLanguage(Lang.ru);
    }
  };

  const sidebarClose = () => dispatch(closeSidebar());

  const navigateToAccount = () => {
    if (auth) {
      sidebarClose();
      navigate('/account');
    }
  };

  return (
    <header>
      <ul>
        <li className={!auth ? 'disable-events' : ''}>
          <Link onClick={sidebarClose} to="/home">
            <IconLogo />
          </Link>
        </li>
        <li onClick={navigateToAccount}>{auth ? <User /> : <UserIcon />}</li>
        <div className="toggle__container">
          <li className="toggleLang__container">
            <button onClick={toggleLang}>{language}</button>
          </li>
          <li onClick={toggleTheme} className="toggleTheme__container">
            <button>{darkTheme ? IconDarkTheme() : IconLightTheme()}</button>
          </li>
        </div>
      </ul>
    </header>
  );
};
