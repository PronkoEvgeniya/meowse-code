import { ArrowAbout2, ArrowAbout1 } from '../../assets/Sprite';
import xenia from '../../assets/images/photos/xenia.jpg';
import jen from '../../assets/images/photos/jen.jpg';
import kris from '../../assets/images/photos/kris.jpg';
import './aboutPage.scss';
import { useTranslation } from 'react-i18next';

export const AboutPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="about__container">
      <h2>{t('aboutPage.title-1')}</h2>
      <div className="content__container-about odd">
        <h3>{t('aboutPage.block1-title')}</h3>
        <span>{t('aboutPage.block1-span')}</span>
      </div>
      <div className="arrow__container odd">{ArrowAbout1()}</div>
      <div className="content__container-about even">{t('aboutPage.block2')}</div>
      <div className="arrow__container even">{ArrowAbout2()}</div>
      <div className="content__container-about odd">
        <ul>
          <li>{t('aboutPage.block3-1')}</li>
          <li>{t('aboutPage.block3-2')}</li>
          <li>{t('aboutPage.block3-3')}</li>
          <li>{t('aboutPage.block3-4')}</li>
          <li>{t('aboutPage.block3-5')}</li>
          <li>{t('aboutPage.block3-6')}</li>
        </ul>
      </div>
      <div className="arrow__container odd">{ArrowAbout1()}</div>
      <div className="content__container-about even">
        <h4>{t('aboutPage.block4-title')}</h4>
        <ul>
          <li>{t('aboutPage.block4-1')}</li>
          <li>{t('aboutPage.block4-2')}</li>
          <li>{t('aboutPage.block4-3')}</li>
        </ul>
      </div>
      <div className="arrow__container even">{ArrowAbout2()}</div>
      <div className="content__container-about odd">{t('aboutPage.block5')}</div>
      <div className="arrow__container odd">{ArrowAbout1()}</div>
      <div className="content__container-about even">{t('aboutPage.block6')}</div>
      <div className="arrow__container even">{ArrowAbout2()}</div>
      <div className="content__container-about odd">{t('aboutPage.block7')}</div>
      <div className="dev__container-about" id="dev">
        <h3>{t('aboutPage.dev')}</h3>
        <div className="dev__content-about">
          <a
            href="https://github.com/PronkoEvgeniya"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={jen} alt="" />
            <span className="card-name">{t('aboutPage.jen')}</span>
            <span>{t('aboutPage.role1')}</span>
          </a>
          <a
            href="https://github.com/kr1s10"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={kris} alt="" />
            <span className="card-name">{t('aboutPage.kris')}</span>
            <span>{t('aboutPage.role2')}</span>
          </a>
          <a
            href="https://github.com/voitehovichxenia"
            target="_blank"
            className="dev__card"
            rel="noreferrer"
          >
            <img src={xenia} alt="" />
            <span className="card-name">{t('aboutPage.xenia')}</span>
            <span>{t('aboutPage.role2')}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
