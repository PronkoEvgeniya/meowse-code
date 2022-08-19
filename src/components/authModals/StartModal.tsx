import { ModalProps } from '../../types/interfaces';
import { SocialBtns } from './SocialBtns';

export const StartModal = ({ setAuth }: ModalProps): JSX.Element => {
  const changeModal = (value: string) => setAuth(value);
  return (
    <>
      <button onClick={() => changeModal('login')}>Войти</button>
      <SocialBtns />
      <button onClick={() => changeModal('signup')}>Регистрация</button>
      <SocialBtns />
    </>
  );
};
