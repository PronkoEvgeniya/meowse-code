/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setEmail, setPassword, setToken } from '../../app/store/reducers/userSlice';
import { authorizeUser } from '../../app/store/userRequests';
import { LSParameters } from '../../types/constants';

export const LogInModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password, error, isAuthorized } = useAppSelector(({ user }) => user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizeUser({ email, password }));
  };

  const putEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setEmail(value));

  const putPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPassword(value));

  useEffect(() => {
    if (isAuthorized) {
      dispatch(setToken(localStorage.getItem(LSParameters.token)));
      navigate('/home');
    }
  }, [isAuthorized]);

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
          type="password"
          autoComplete="current-password"
          placeholder={t('start.password')}
          value={password}
          onChange={putPassword}
        />
        <button type="submit">{t('start.logIn')}</button>
      </form>
      {error && <span>{error}</span>}
    </>
  );
};
