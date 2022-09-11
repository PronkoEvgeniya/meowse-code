/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import {
  setConfirmPassword,
  setEmail,
  setName,
  setNameValidity,
  setPassword,
} from '../../app/store/reducers/userSlice';
import { authorizeUser, registerUser } from '../../app/store/userRequests';

export const SignUpModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, email, password, confirmPassword, error, isRegistrated, isValidName } =
    useAppSelector(({ user }) => user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const validName = name.trim();
      if (validName) {
        dispatch(registerUser({ name: validName, email, password }));
      } else {
        dispatch(setNameValidity(false));
      }
    }
  };

  const putName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(value));
    dispatch(setNameValidity(true));
  };

  const putEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setEmail(value));

  const putPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPassword(value));

  const putConfirmPass = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setConfirmPassword(value));

  useEffect(() => {
    if (isRegistrated) {
      dispatch(authorizeUser({ email, password }));
      navigate('/tutorial');
    }
  }, [isRegistrated]);

  return (
    <>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          autoComplete="email"
          placeholder={t('start.email')}
          value={email}
          onChange={putEmail}
        />
        <input
          type="text"
          autoComplete="username"
          placeholder={t('start.name')}
          value={name}
          onChange={putName}
        />
        {!isValidName && <span>{t('invalidName')}</span>}
        <input
          type="password"
          autoComplete="new-password"
          placeholder={t('start.password')}
          value={password}
          onChange={putPassword}
        />
        <input
          type="password"
          autoComplete="new-password"
          placeholder={t('start.confirmPassword')}
          value={confirmPassword}
          onChange={putConfirmPass}
        />
        <button type="submit">{t('start.signUp')}</button>
      </form>
      {error && <span>{error}</span>}
    </>
  );
};
