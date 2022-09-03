import { useAppSelector } from '../../app/hooks/reduxHooks';
import { UserIcon } from './UserIcon';

export const User = (): JSX.Element => {
  const name = useAppSelector(({ user }) => user.name);

  return (
    <>
      <UserIcon />
      <span>{name}</span>
    </>
  );
};
