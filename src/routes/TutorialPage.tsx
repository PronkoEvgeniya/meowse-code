import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const TutorialPage = (): JSX.Element => {
  const { t } = useTranslation();
  const name = 'user';
  const navigate = useNavigate();
  const [contentId, setContentId] = useState(0);
  const content = `tutorial.${contentId}`;

  const changeHandler = () => {
    contentId === 2 ? navigate('/home') : setContentId((prev) => ++prev);
  };

  return (
    <div>
      {contentId ? (
        <p>{t(`${content}.description`)}</p>
      ) : (
        <p>
          <Trans i18nKey={`${content}.description`} values={{ name }}>
            Добро пожаловать, {name}! Меня зовут <span style={{ color: '#9C56C7' }}>Мяус</span>
          </Trans>
        </p>
      )}
      <div>
        <button onClick={changeHandler}>{t(`${content}.btn`)}</button>
        <div>маскот</div>
      </div>
    </div>
  );
};
