import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { AuthModal } from '../components/authModals';
import { LogInModal } from '../components/authModals/LogInModal';
import { SignUpModal } from '../components/authModals/SignUpModal';
import { StartModal } from '../components/authModals/StartModal';
import { Modals } from '../types/constants';
import './startPage.scss';

export const StartPage = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const token = useAppSelector(({ app }) => app.token);
  const [auth, setAuth] = useState('');

  const changeModal = (value: string) => () => setAuth(value);

  const switchComponent = () => {
    switch (auth) {
      case 'login':
        return <LogInModal />;
      case 'signup':
        return <SignUpModal />;
      default:
        return <StartModal setAuth={setAuth} />;
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/home');
    }
  });

  return (
    <div className="start-page">
      {auth && <AuthModal setAuth={setAuth}>{switchComponent()}</AuthModal>}
      <h1>
        <Trans i18nKey={'start.title'}>
          Добро пожаловать <br /> на интерактивный курс изучения азбуки
          <span style={{ color: '#9C56C7' }}>Морзе</span>!
        </Trans>
      </h1>
      <p>{t('start.description')} &#129106;</p>
      <button className="start-btn" onClick={changeModal(Modals.start)}>
        {t('start.startBtn')}
      </button>
    </div>
  );
};
