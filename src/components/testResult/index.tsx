import { useAppSelector } from '../../app/hooks/reduxHooks';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  setAnswer,
  setAnswerValidity,
  setCompleteness,
  setHandleSubmit,
} from '../../app/store/reducers/testingSlice';
import win from '../../assets/images/sert-meows.png';
import sert from '../../assets/images/win-meows.png';
import { testPercent } from '../../types/constants';

export const TestResult = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const result = useAppSelector(({ testing }) => testing.result);
  const name = useAppSelector(({ user }) => user.name);

  const againHandler = () => {
    dispatch(setAnswer(''));
    dispatch(setAnswerValidity(true));
    dispatch(setCompleteness(false));
    dispatch(setHandleSubmit(false));
  };

  return result < testPercent ? (
    <>
      <p>
        <Trans i18nKey={'testing.looser'} values={{ score: result }} />
      </p>
      <button onClick={againHandler}>{t('testing.againBtn')}</button>
    </>
  ) : (
    <>
      <p>
        <Trans i18nKey={'testing.winner'} values={{ name }}>
          Поздравляю, <span style={{ color: '#9C56C7' }}>{name}</span>
        </Trans>
      </p>
      <div>
        <img src={sert} alt="" />
      </div>
      <div>
        <img src={win} alt="" />
      </div>
    </>
  );
};
