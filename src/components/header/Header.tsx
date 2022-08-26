import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { IconLogo } from '../../assets/Sprite';
import { Lang } from '../../types/constants';
import { User } from './User';
import { UserIcon } from './UserIcon';

export const Header = (): JSX.Element => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const auth = useAppSelector(({ app: { isAuthorized } }) => isAuthorized);

  const toggleLang = () => {
    if (language === Lang.ru) {
      changeLanguage(Lang.en);
    } else {
      changeLanguage(Lang.ru);
    }
  };

  return (
    <header>
      <ul>
        <li className={!auth ? 'disable-events' : ''}>
          <Link to="/home">
            <IconLogo />
          </Link>
        </li>
        <li>{auth ? <User /> : <UserIcon />}</li>
        <li>
          <button onClick={toggleLang}>{language}</button>
        </li>
      </ul>
    </header>
  );
};
