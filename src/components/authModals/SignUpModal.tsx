import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import {
  registerUser,
  setConfirmPassword,
  setEmail,
  setName,
  setPassword,
} from '../../app/store/reducers/appSlice';

export const SignUpModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { name, email, password, confirmPassword, error, isAuthorized } = useAppSelector(
    ({ app }) => app
  );

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(registerUser({ name, email, password }));
    }
  };

  const putName = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setName(value));

  const putEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setEmail(value));

  const putPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPassword(value));

  const putConfirmPass = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setConfirmPassword(value));

  useEffect(() => {
    if (isAuthorized) navigate('/tutorial');
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          type="text"
          autoComplete="username"
          placeholder={t('start.name')}
          value={name}
          onChange={putName}
        />
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
