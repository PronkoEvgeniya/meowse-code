import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { IconLogo } from '../../assets/Sprite';
import { User } from './User';
import { UserIcon } from './UserIcon';

export const Header = (): JSX.Element => {
  const auth = useAppSelector(({ app: { isAuthorized } }) => isAuthorized);

  return (
    <header>
      <ul>
        <li className={!auth ? 'disable-events' : ''}>
          <Link to="/home">
            <IconLogo />
          </Link>
        </li>
        <li>{auth ? <User /> : <UserIcon />}</li>
      </ul>
    </header>
  );
};
