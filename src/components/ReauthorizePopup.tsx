import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks/reduxHooks';
import { setAuthorization, setFailedToken } from '../app/store/reducers/userSlice';
import { LSParameters } from '../types/constants';

export const ReauthorizePopup = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const redirectHandler = () => {
    localStorage.removeItem(LSParameters.token);
    dispatch(setAuthorization(false));
    dispatch(setFailedToken());
    navigate('/');
  };

  return (
    <div style={{ position: 'absolute', top: '50%' }}>
      <div>
        <span>{t('failedToken')}</span>
        <button onClick={redirectHandler}>{t('start.logIn')}</button>
      </div>
    </div>
  );
};
