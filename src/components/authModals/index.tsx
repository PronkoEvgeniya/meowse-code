import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setError, setNameValidity } from '../../app/store/reducers/userSlice';
import { IconStep } from '../../assets/Sprite';
import { Modals } from '../../types/constants';
import { AuthModalProps } from '../../types/interfaces';
import { LogInModal } from './LogInModal';
import { SignUpModal } from './SignUpModal';
import './modal.scss';
import { useClear } from '../../app/hooks/useClear';
import { useEffect } from 'react';
import { useContext } from 'react';
import { DarkThemeContext } from '../../context/DarkModeContext';

export const AuthModal = ({ auth, setAuth }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const clear = useClear();
  const error = useAppSelector(({ user }) => user.error);
  const { darkTheme } = useContext(DarkThemeContext);

  const changeModal = (value: string) => () => {
    setAuth(value);
    clear();
    dispatch(setError(null));
    dispatch(setNameValidity(true));
  };

  useEffect(() => {
    if (error) {
      clear();
    }
  }, [clear, error]);

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
