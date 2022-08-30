import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';
import Input from './Input';
import { registration } from '../../actions/registration';

export const SignUpModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    registration(email, password, name);
    dispatch(setAuthorization({ auth: true }));
    navigate('/tutorial');
  };

  const [email, setEmail] = useState<number | string>('');
  const [password, setPassword] = useState<number | string>('');
  const [name, setName] = useState<number | string>('');

  return (
    <>
      <Input value={email} setValue={setEmail} type="text" placeholder={t('start.email')} />
      <Input value={name} setValue={setName} type="text" placeholder={t('start.name')} />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder={t('start.password')}
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder={t('start.confirmPassword')}
      />
      <button onClick={navigateHandler}>{t('start.signUp')}</button>
    </>
  );
};
