import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import {
  setConfirmPassword,
  setEmail,
  setError,
  setName,
  setPassword,
} from '../../app/store/reducers/userSlice';
import { IconStep } from '../../assets/Sprite';
import { Modals } from '../../types/constants';
import { AuthModalProps } from '../../types/interfaces';
import { LogInModal } from './LogInModal';
import { SignUpModal } from './SignUpModal';
import './modal.scss';
import { useContext } from 'react';
import { DarkThemeContext } from '../../context/DarkModeContext';

export const AuthModal = ({ auth, setAuth }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { darkTheme } = useContext(DarkThemeContext);

  const changeModal = (value: string) => () => {
    setAuth(value);
    resetInputs();
  };

  const resetInputs = () => {
    dispatch(setName(''));
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    dispatch(setConfirmPassword(''));
    dispatch(setError(null));
  };

  return (
    <div className="modal-bg">
      <div className={darkTheme ? 'modal-container dark' : 'modal-container'}>
        {auth === Modals.login ? <LogInModal /> : <SignUpModal />}
        <button className="btn-back" onClick={changeModal('')}>
          <IconStep />
          {t('start.backBtn')}
        </button>
      </div>
    </div>
  );
};
