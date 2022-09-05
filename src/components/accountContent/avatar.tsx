import { IAvatarProps } from '../../types/interfaces';

export const Avatar = ({
  image,
  installedAvatar,
  setInstalledAvatar,
}: IAvatarProps): JSX.Element => {
  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setInstalledAvatar(value);
  };

  return (
    <label>
      <img src={`./avatars/${image}`} alt={image} />
      <span>*</span>
      <input
        type="radio"
        value={image}
        checked={installedAvatar === image}
        onChange={inputHandler}
      />
    </label>
  );
};
