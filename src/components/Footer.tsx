import { useTranslation } from 'react-i18next';

export const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <footer>
      <a href="#">{t('developers')}</a>
      <span>2022</span>
      <a href="https://rs.school/js/">RSSchool</a>
    </footer>
  );
};
