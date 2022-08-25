import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';

export const SignUpModal = (): JSX.Element => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setAuthorization({ auth: true }));
    navigate('/tutorial');
  };

  return (
    <>
      <input type="text" placeholder={t('start.email')} />
      <input type="text" placeholder={t('start.name')} />
      <input type="text" placeholder={t('start.password')} />
      <input type="text" placeholder={t('start.confirmPassword')} />
      <button onClick={navigateHandler}>{t('start.signUp')}</button>
    </>
  );
};
