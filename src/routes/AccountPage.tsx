import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { useClear } from '../app/hooks/useClear';
import { setAuthorization, setSertificate } from '../app/store/reducers/userSlice';
import { updateUser } from '../app/store/userRequests';
import { FormUpdate } from '../components/accountContent/updateUser';
import { LSParameters } from '../types/constants';
import sert from '../assets/images/win-meows.png';
import './accountPage.scss';

export const AccountPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clear = useClear();
  const { t } = useTranslation();
  const [score, sertificate] = useAppSelector(({ user: { score, sertificate } }) => [
    score,
    sertificate,
  ]);

  const signOutHandler = () => {
    localStorage.removeItem(LSParameters.token);
    dispatch(setAuthorization(false));
    clear();
    navigate('/');
  };

  const Delete = () => {
    dispatch(setSertificate(false));
    dispatch(updateUser({ sertificate: false }));
  };

  return (
    <div className="account-page">
      <FormUpdate />
      <p>
        <Trans i18nKey={'account.score'} values={{ score }} />
      </p>
      {sertificate && (
        <div>
          {t('account.sertificate')}
          <div>
            <img src={sert} alt="" />
          </div>
        </div>
      )}
      <button className="logout__btn" onClick={signOutHandler}>
        {t('account.signOut')}
      </button>
      <button onClick={Delete}>delete</button>
    </div>
  );
};
