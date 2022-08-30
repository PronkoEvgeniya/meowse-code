import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';
import Input from './Input';

export const LogInModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setAuthorization({ auth: true }));
    navigate('/home');
  };

  const [email, setEmail] = useState<number | string>('');
  const [password, setPassword] = useState<number | string>('');

  return (
    <>
      <Input value={email} setValue={setEmail} type="text" placeholder={t('start.email')} />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder={t('start.password')}
      />
      <label>
        <input type="checkbox" />
        {t('start.remember')}
      </label>
      <button onClick={navigateHandler}>{t('start.logIn')}</button>
    </>
  );
};
