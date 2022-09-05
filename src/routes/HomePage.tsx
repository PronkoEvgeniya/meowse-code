import { Trans, useTranslation } from 'react-i18next';
import { useAppSelector } from '../app/hooks/reduxHooks';
import img from '../assets/images/greet-meowsWHITE.png';
import './HomePage/homePage.scss';

export const HomePage = (): JSX.Element => {
  const { t } = useTranslation();
  const name = useAppSelector(({ user }) => user.name);

  return (
    <div className="homepage__container">
      <div className="content__container">
        <h2>
          <Trans i18nKey={'home.question1'} values={{ name }}>
            Как дела, <span style={{ color: '#9C56C7' }}>{name}</span>?
          </Trans>
        </h2>
        <h2>{t('home.question2')}</h2>
      </div>
      <div className="mascot__container">
        <img src={img} alt="" />
      </div>
    </div>
  );
};
