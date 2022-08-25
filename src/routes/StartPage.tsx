import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AuthModal } from '../components/authModals';
import { LogInModal } from '../components/authModals/LogInModal';
import { SignUpModal } from '../components/authModals/SignUpModal';
import { StartModal } from '../components/authModals/StartModal';

export const StartPage = (): JSX.Element => {
  const { t } = useTranslation();
  const page = 'start';
  const [auth, setAuth] = useState('');

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

  return (
    <div>
      {auth && <AuthModal setAuth={setAuth}>{switchComponent()}</AuthModal>}
      <h1>
        <Trans i18nKey={`${page}.title`}>
          Добро пожаловать на интерактивный курс изучения азбуки
          <span style={{ color: '#9C56C7' }}>Морзе</span>!
        </Trans>
      </h1>
      <p>{t(`${page}.description`)} &#129106;</p>
      <button onClick={() => setAuth('start')}>{t(`${page}.startBtn`)}</button>
    </div>
  );
};
