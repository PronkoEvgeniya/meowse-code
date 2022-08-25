import { useTranslation } from 'react-i18next';
import { ModalProps } from '../../types/interfaces';
import { SocialBtns } from './SocialBtns';

export const StartModal = ({ setAuth }: ModalProps): JSX.Element => {
  const { t } = useTranslation();
  const changeModal = (value: string) => setAuth(value);

  return (
    <>
      <button onClick={() => changeModal('login')}>{t('start.logIn')}</button>
      <SocialBtns />
      <button onClick={() => changeModal('signup')}>{t('start.signUp')}</button>
      <SocialBtns />
    </>
  );
};
