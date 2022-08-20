import { Link } from 'react-router-dom';
import { IconArrow, IconLogin, IconLogo } from '../../assets/Sprite';

export const Header = (): JSX.Element => {
  return (
    <header>
      <ul>
        <li>
          <Link to="/home">
            <IconLogo />
          </Link>
        </li>
        <li>
          <div
            style={{
              width: '55px',
              height: '55px',
              background: '#9C56C7',
              display: 'flex',
              justifyContent: 'center',
              borderRadius: '50%',
              alignItems: 'center',
            }}
            className="user-icon"
          >
            <IconLogin />
          </div>
          <span>name</span>
          <IconArrow />
        </li>
      </ul>
    </header>
  );
};
