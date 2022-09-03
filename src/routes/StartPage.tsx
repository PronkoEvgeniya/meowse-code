import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { AuthModal } from '../components/authModals';
import { Modals } from '../types/constants';
import './startPage.scss';

export const StartPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useAppSelector(({ user }) => user.token);
  const [auth, setAuth] = useState('');

  const changeModal = (value: string) => () => setAuth(value);

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  });

  return (
    <div className="start-page">
      {auth && <AuthModal auth={auth} setAuth={setAuth} />}
      <h1>
        <Trans i18nKey={'start.title'}>
          Добро пожаловать <br /> на интерактивный курс изучения азбуки
          <span style={{ color: '#9C56C7' }}>Морзе</span>!
        </Trans>
      </h1>
      <p>{t('start.description')} &#129106;</p>
      <div>
        <button className="start-btn" onClick={changeModal(Modals.login)}>
          {t('start.logIn')}
        </button>
        <button className="start-btn" onClick={changeModal(Modals.signup)}>
          {t('start.signUp')}
        </button>
      </div>
    </div>
  );
};
