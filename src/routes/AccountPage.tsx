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
import { getLeaders } from '../app/store/userRequests';
import { toggleLeadersVisibility } from '../app/store/reducers/appSlice';
import { useEffect } from 'react';

export const AccountPage = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clear = useClear();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const isVisibleLeaders = useAppSelector(({ app }) => app.isVisibleLeaders);
  const leaders = useAppSelector(({ app }) => app.leaders);
  const [score, sertificate] = useAppSelector(({ user: { score, sertificate } }) => [
    score,
    sertificate,
  ]);
  const cert = lang === Lang.ru ? certRU : certEN;
  const pdfCert = lang === Lang.ru ? pdf.ru : pdf.en;

  useEffect(() => {
    dispatch(getLeaders());
  });

  const getLeadersHandler = () => {
    dispatch(toggleLeadersVisibility());
  };

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
      <button onClick={getLeadersHandler}>
        {isVisibleLeaders ? t('account.hideLeaders') : t('account.getLeaders')}
      </button>
      {isVisibleLeaders && (
        <ol className="leaderboard__container">
          {leaders.map(({ name, score }, idx) => (
            <li key={idx}>
              <span>{name}</span>
              <span>{score}</span>
            </li>
          ))}
        </ol>
      )}
      {sertificate && (
        <div className="sertificate__container">
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
