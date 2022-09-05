import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { useClear } from '../app/hooks/useClear';
import { setAuthorization } from '../app/store/reducers/userSlice';
import { FormUpdate } from '../components/accountContent/updateUser';
import { Lang, LSParameters } from '../types/constants';
import certRU from '../assets/images/certificateRU.jpg';
import certEN from '../assets/images/certificateENG.jpg';
import { pdf } from '../assets/certificates';
import './accountPage.scss';

export const AccountPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clear = useClear();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const [score, sertificate] = useAppSelector(({ user: { score, sertificate } }) => [
    score,
    sertificate,
  ]);
  const cert = lang === Lang.ru ? certRU : certEN;
  const pdfCert = lang === Lang.ru ? pdf.ru : pdf.en;

  const signOutHandler = () => {
    localStorage.removeItem(LSParameters.token);
    dispatch(setAuthorization(false));
    clear();
    navigate('/');
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
            <a href={pdfCert} target="_blank" rel="noreferrer">
              <img src={cert} alt="certificate" />
            </a>
          </div>
        </div>
      )}
      <button className="logout__btn" onClick={signOutHandler}>
        {t('account.signOut')}
      </button>
    </div>
  );
};
