import { ArrowAbout2, ArrowAbout1 } from '../../assets/Sprite';
import photo from '../../assets/images/photos/dev-card.jpg';
import './aboutPage.scss';
import { useTranslation } from 'react-i18next';

export const AboutPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="about__container">
      <h2>{t('aboutPage.title-1')}</h2>
      <p className="content__container-about">
        <h3>{t('aboutPage.block1-title')}</h3>
        <span>{t('aboutPage.block1-span')}</span>
      </p>
      <div className="arrow__container">{ArrowAbout1()}</div>
      <p className="content__container-about">{t('aboutPage.block2')}</p>
      <div className="arrow__container">{ArrowAbout2()}</div>
      <p className="content__container-about">
        <ul>
          <li>{t('aboutPage.block3-1')}</li>
          <li>{t('aboutPage.block3-2')}</li>
          <li>{t('aboutPage.block3-3')}</li>
          <li>{t('aboutPage.block3-4')}</li>
          <li>{t('aboutPage.block3-5')}</li>
          <li>{t('aboutPage.block3-6')}</li>
        </ul>
      </p>
      <div className="arrow__container">{ArrowAbout1()}</div>
      <p className="content__container-about">
        <h4>{t('aboutPage.block4-title')}</h4>
        <ul>
          <li>{t('aboutPage.block4-1')}</li>
          <li>{t('aboutPage.block4-2')}</li>
          <li>{t('aboutPage.block4-3')}</li>
        </ul>
      </p>
      <div className="arrow__container">{ArrowAbout2()}</div>
      <p className="content__container-about">{t('aboutPage.block5')}</p>
      <div className="arrow__container">{ArrowAbout1()}</div>
      <p className="content__container-about">{t('aboutPage.block6')}</p>
      <div className="arrow__container">{ArrowAbout2()}</div>
      <p className="content__container-about">{t('aboutPage.block7')}</p>
      <div className="dev__container-about">
        <h3>{t('aboutPage.dev')}</h3>
        <div className="dev__content-about">
          <a
            href="https://github.com/PronkoEvgeniya"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={photo} alt="" />
            <span className="card-name">{t('aboutPage.jen')}</span>
            <span>{t('aboutPage.role1')}</span>
          </a>
          <a
            href="https://github.com/kr1s10"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={photo} alt="" />
            <span className="card-name">{t('aboutPage.kris')}</span>
            <span>{t('aboutPage.role2')}</span>
          </a>
          <a
            href="https://github.com/voitehovichxenia"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={photo} alt="" />
            <span className="card-name">{t('aboutPage.xenia')}</span>
            <span>{t('aboutPage.role2')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
