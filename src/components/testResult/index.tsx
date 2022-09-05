import { useAppSelector } from '../../app/hooks/reduxHooks';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setAnswer,
  setAnswerValidity,
  setCompleteness,
  setHandleSubmit,
} from '../../app/store/reducers/testingSlice';
import { testPercent } from '../../types/constants';
import win from '../../assets/images/sert-meows.png';
import loose from '../../assets/images/loose-meows.png';
import { useNavigate } from 'react-router-dom';

export const TestResult = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const result = useAppSelector(({ testing }) => testing.result);
  const name = useAppSelector(({ user }) => user.name);

  const againHandler = () => {
    dispatch(setAnswer(''));
    dispatch(setAnswerValidity(true));
    dispatch(setCompleteness(false));
    dispatch(setHandleSubmit(false));
  };

  const navigateHandler = () => navigate('/account');

  return result < testPercent ? (
    <>
      <p>
        <Trans i18nKey={'testing.looser'} values={{ score: result }} />
      </p>
      <button onClick={againHandler}>{t('testing.againBtn')}</button>
      <div>
        <img src={loose} alt="win-cat" />
      </div>
    </>
  ) : (
    <>
      <p>
        <Trans i18nKey={'testing.winner'} values={{ name }}>
          Поздравляю, <span style={{ color: '#9C56C7' }}>{name}</span>
        </Trans>
      </p>
      <button onClick={navigateHandler}>{t('testing.toProfile')}</button>
      <div>
        <img src={win} alt="win-cat" />
      </div>
    </>
  );
};
