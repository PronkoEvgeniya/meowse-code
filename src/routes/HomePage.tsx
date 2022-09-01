import { Trans, useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks/reduxHooks';

export const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const name = useAppSelector(({ app }) => app.name);

  return (
    <div>
      <div>
        <h2>
          <Trans i18nKey={'home.question1'} values={{ name }}>
            Как дела, <span style={{ color: '#9C56C7' }}>{name}</span>?
          </Trans>
        </h2>
        <h2>{t('home.question2')}</h2>
      </div>
      <div>маскот</div>
    </div>
  );
};
