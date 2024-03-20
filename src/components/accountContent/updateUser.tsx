import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setName, setAvatar, setNameValidity } from '../../app/store/reducers/userSlice';
import { getLeaders, updateUser } from '../../app/store/userRequests';
import { avatars } from '../../types/constants';
import { UserIcon } from '../header/UserIcon';
import { Avatar } from './avatar';

export const FormUpdate = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [name, avatar, isValidName] = useAppSelector(({ user: { name, avatar, isValidName } }) => [
    name,
    avatar,
    isValidName,
  ]);

  const [installedAvatar, setInstalledAvatar] = useState(avatar);
  const [newName, setNewName] = useState(name);
  const isChecked = avatar !== installedAvatar;
  const isChanged = name !== newName && name !== newName.trim();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isChanged || isChecked) {
      const validName = newName.trim();
      setNewName(validName);
      dispatch(setName(validName));
      dispatch(setAvatar(installedAvatar));
      await dispatch(updateUser({ name: validName, avatar: installedAvatar as string }));
      await dispatch(getLeaders());
    }
  };

  const inputHandler = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(value);
    dispatch(setNameValidity(true));
  };

  useEffect(() => {
    if (!newName.trim()) {
      dispatch(setNameValidity(false));
    }
  }, [dispatch, newName]);

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
      <div className="select-avatar__container">
        {avatars.map((img, idx) => (
          <Avatar
            key={idx}
            image={img}
            installedAvatar={installedAvatar}
            setInstalledAvatar={setInstalledAvatar}
          />
        ))}
      </div>
      {(isChanged || isChecked) && (
        <button disabled={!isValidName} type="submit">
          {t('account.update')}
        </button>
      )}
    </form>
  );
};
