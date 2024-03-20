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
    <div>
      <input
        id={image.slice(0, 7)}
        type="radio"
        value={image}
        checked={installedAvatar === image}
        onChange={inputHandler}
      />

      <label htmlFor={image.slice(0, 7)}>
        <img src={`./avatars/${image}`} alt={image} />
        <span></span>
      </label>
    </div>
  );
};
