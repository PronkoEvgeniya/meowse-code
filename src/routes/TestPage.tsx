import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setSertificate } from '../app/store/reducers/userSlice';
import { updateUser } from '../app/store/userRequests';
import { TestContent } from '../components/testContent';
import { TestResult } from '../components/testResult';
import { testPercent } from '../types/constants';

export const TestPage = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isCompleted = useAppSelector(({ testing }) => testing.isCompleted);
  const result = useAppSelector(({ testing }) => testing.result);
  const sertificate = useAppSelector(({ user }) => user.sertificate);

  useEffect(() => {
    if (result === testPercent && !sertificate) {
      dispatch(setSertificate(true));
      dispatch(updateUser({ sertificate: true }));
    }
  }, [dispatch, result, sertificate]);

  return (
    <div>
      <h2>{t('test')}</h2>
      {isCompleted ? <TestResult /> : <TestContent />}
    </div>
  );
};
