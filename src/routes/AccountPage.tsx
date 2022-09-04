import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setAuthorization } from '../app/store/reducers/userSlice';
import { FormUpdate } from '../components/accountContent/updateUser';
import { LSParameters } from '../types/constants';

export const AccountPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [score, sertificate] = useAppSelector(({ user: { score, sertificate } }) => [
    score,
    sertificate,
  ]);

  const signOutHandler = () => {
    localStorage.removeItem(LSParameters.token);
    dispatch(setAuthorization(false));
    navigate('/');
    location.reload();
  };

  return (
    <div>
      <FormUpdate />
      <p>
        <Trans i18nKey={'account.score'} values={{ score }} />
      </p>
      <div>
        {t('account.sertificate')}
        <div>{sertificate ? 'сертификат' : ':('}</div>
      </div>
      <button onClick={signOutHandler}>{t('account.signOut')}</button>
    </div>
  );
};
