import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import {
  setConfirmPassword,
  setEmail,
  setError,
  setName,
  setPassword,
} from '../../app/store/reducers/appSlice';
import { IconStep } from '../../assets/Sprite';
import { AuthModalProps } from '../../types/interfaces';
import './modal.scss';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
      <div className="modal-container">
        {children}
        <button className="btn-back" onClick={changeModal('')}>
          <IconStep />
          {t('start.backBtn')}
        </button>
      </div>
    </div>
  );
};
