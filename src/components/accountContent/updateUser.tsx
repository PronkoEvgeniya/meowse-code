import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setName, setAvatar } from '../../app/store/reducers/userSlice';
import { updateUser } from '../../app/store/userRequests';
import { avatars, LSParameters } from '../../types/constants';
import { UserIcon } from '../header/UserIcon';
import { Avatar } from './avatar';

export const FormUpdate = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem(LSParameters.token);
  const [name, avatar] = useAppSelector(({ user: { name, avatar } }) => [name, avatar]);

  const [installedAvatar, setInstalledAvatar] = useState(avatar);
  const [newName, setNewName] = useState(name);
  const isChecked = avatar !== installedAvatar;
  const isChanged = name !== newName;

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChanged || isChecked) {
      dispatch(setName(newName));
      dispatch(setAvatar(installedAvatar));
      dispatch(
        updateUser({
          token: token as string,
          user: { name: newName, avatar: installedAvatar as string },
        })
      );
    }
  };

  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(value);
  };

  useEffect(() => {
    setNewName(name);
    setInstalledAvatar(avatar);
  }, [name, avatar]);

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>
          {t('account.name')}
          <input type="text" value={newName} onChange={inputHandler} />
        </label>
        {avatar ? <img src={`./avatars/${avatar}`} alt="avatar" /> : <UserIcon />}
      </div>
      <div>
        {avatars.map((img, idx) => (
          <Avatar
            key={idx}
            image={img}
            installedAvatar={installedAvatar}
            setInstalledAvatar={setInstalledAvatar}
          />
        ))}
      </div>
      {(isChanged || isChecked) && <button type="submit">update</button>}
    </form>
  );
};
