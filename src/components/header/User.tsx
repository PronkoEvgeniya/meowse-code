import { useAppSelector } from '../../app/hooks/reduxHooks';
import { UserIcon } from './UserIcon';

export const User = (): JSX.Element => {
  const [name, avatar] = useAppSelector(({ user: { name, avatar } }) => [name, avatar]);
  const route = location.pathname.split('/').length;
  const path = route > 2 ? `../avatars/${avatar}` : `./avatars/${avatar}`;

  return (
    <>
      {avatar ? <img src={path} alt="avatar" /> : <UserIcon />}
      <span>{name}</span>
    </>
  );
};
