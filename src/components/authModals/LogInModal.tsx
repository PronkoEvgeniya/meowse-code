import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setEmail, setPassword } from '../../app/store/reducers/userSlice';
import { authorizeUser } from '../../app/store/userRequests';

export const LogInModal = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { email, password, error } = useAppSelector(({ user }) => user);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(authorizeUser({ email, password }));
  };

  const putEmail = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setEmail(value));

  const putPassword = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(setPassword(value));

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
