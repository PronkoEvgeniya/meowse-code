import { useAppSelector } from '../../app/hooks/reduxHooks';
import { UserIcon } from './UserIcon';

export const User = (): JSX.Element => {
  const [name, avatar] = useAppSelector(({ user: { name, avatar } }) => [name, avatar]);

  return (
    <>
      {avatar ? <img src={`./avatars/${avatar}`} alt="avatar" /> : <UserIcon />}
      <span>{name}</span>
    </>
  );
};
