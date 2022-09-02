import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { authorizeUser, setEmail, setPassword } from '../../app/store/reducers/appSlice';

export const LogInModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { email, password, error, isAuthorized } = useAppSelector(({ app }) => app);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizeUser({ email, password }));
  };

  const putEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setEmail(value));

  const putPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPassword(value));

  useEffect(() => {
    if (isAuthorized) navigate('/home');
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
          type="password"
          autoComplete="current-password"
          placeholder={t('start.password')}
          value={password}
          onChange={putPassword}
        />
        <label>
          <input type="checkbox" />
          {t('start.remember')}
        </label>
        <button type="submit">{t('start.logIn')}</button>
      </form>
      {error && <span>{error}</span>}
    </>
  );
};
