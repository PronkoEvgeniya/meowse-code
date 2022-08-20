import { IconArrow } from '../../assets/Sprite';
import { UserIcon } from './UserIcon';

export const User = (): JSX.Element => {
  return (
    <>
      <UserIcon />
      <span>name</span>
      <div className="user-arrow">
        <IconArrow />
      </div>
    </>
  );
};
