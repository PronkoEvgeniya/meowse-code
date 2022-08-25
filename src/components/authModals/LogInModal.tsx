import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';

export const LogInModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setAuthorization({ auth: true }));
    navigate('/home');
  };

  return (
    <>
      <input type="text" placeholder={t('start.email')} />
      <input type="text" placeholder={t('start.password')} />
      <label>
        <input type="checkbox" />
        {t('start.remember')}
      </label>
      <button onClick={navigateHandler}>{t('start.logIn')}</button>
    </>
  );
};
