import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks/reduxHooks';
import { TestContent } from '../components/testContent';
import { TestResult } from '../components/TestResult';

export const TestPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { isCompleted } = useAppSelector(({ testing }) => testing);

  return (
    <div>
      <h2>{t('test')}</h2>
      {isCompleted ? <TestResult /> : <TestContent />}
      <div>маскот</div>
    </div>
  );
};
