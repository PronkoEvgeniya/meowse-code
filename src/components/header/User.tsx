import { useAppSelector } from '../../app/hooks/reduxHooks';
import { IconArrow } from '../../assets/Sprite';
import { UserIcon } from './UserIcon';

export const User = (): JSX.Element => {
  const name = useAppSelector(({ app }) => app.name);

  return (
    <>
      <UserIcon />
      <span>{name}</span>
      <div className="user-arrow">
        <IconArrow />
      </div>
    </>
  );
};
