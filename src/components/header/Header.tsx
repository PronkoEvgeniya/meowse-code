import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import logo from './logo.svg';
// import { User } from './User';
// import { UserIcon } from './UserIcon';

export const Header = (): JSX.Element => {
  const auth = useAppSelector(({ app: { isAuthorized } }) => isAuthorized);

  return (
    <header>
      <ul>
        <li className={!auth ? 'disable-events' : ''}>
          <Link to="/home">
            <img src={logo} alt="logo" />
          </Link>
        </li>
        <li>
          <div
            style={{ width: '55px', height: '55px', background: 'purple' }}
            className="user-icon"
          ></div>
          <span>name</span>
          <div
            style={{
              width: '30px',
              height: '30px',
              borderBottom: '5px solid purple',
              borderRight: '5px solid purple',
              transform: 'rotate(45deg)',
            }}
            className="user-arrow"
          ></div>
        </li>
      </ul>
    </header>
  );
};

{
  /* <li>{auth ? <User /> : <UserIcon />}</li> */
}
