import { useState } from 'react';
import { AuthModal } from '../components/authModals';
import { LogInModal } from '../components/authModals/LogInModal';
import { SignUpModal } from '../components/authModals/SignUpModal';
import { StartModal } from '../components/authModals/StartModal';

export const StartPage = (): JSX.Element => {
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
        Добро пожаловать на интерактивный курс изучения азбуки <span>Морзе!</span>
      </h1>
      <p>Нажмите, что бы войти или присоедениться &#129106;</p>
      <button onClick={() => setAuth('start')}>Начать</button>
    </div>
  );
};
