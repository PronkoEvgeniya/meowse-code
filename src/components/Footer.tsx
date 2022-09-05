import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { IconRss } from '../assets/Sprite';
import './footer.scss';

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer>
      <Link
        to={{
          pathname: '/about',
          hash: 'dev',
        }}
      >
        {t('developers')}
      </Link>
      <span>2022</span>
      <a target="_blank" href="https://rs.school/js/" rel="noreferrer">
        {IconRss()}
      </a>
    </footer>
  );
};
