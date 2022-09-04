import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import './tutorial.scss';
import maskot from '../../assets/images/greet-meowsWHITE.png';

export const TutorialPage = (): JSX.Element => {
  const { t } = useTranslation();
  const name = useAppSelector(({ app }) => app.name);
  const navigate = useNavigate();
  const [contentId, setContentId] = useState(0);
  const content = `tutorial.${contentId}`;

  const changeHandler = () => {
    contentId === 2 ? navigate('/home') : setContentId((prev) => ++prev);
  };

  return (
    <div className="tutorial__container">
      {contentId ? (
        <p>{t(`${content}.description`)}</p>
      ) : (
        <p>
          <Trans i18nKey={`${content}.description`} values={{ name }}>
            Добро пожаловать, {name}! Меня зовут <span style={{ color: '#9C56C7' }}>Мяус</span>
          </Trans>
        </p>
      )}
      <div className="tutorial__content">
        <button onClick={changeHandler}>{t(`${content}.btn`)}</button>
        <div className="mascot__container">
          <img src={maskot} alt="" />
        </div>
      </div>
    </div>
  );
};
