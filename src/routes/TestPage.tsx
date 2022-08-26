import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { AudioBtn } from '../components/audioButton';
import { TextArea } from '../components/TextArea';
import { audio } from '../assets/audio/symbols/index';

export const TestPage = (): JSX.Element => {
  const { t } = useTranslation();
  const name = 'user';
  const [valueArea, setValueArea] = useState('');
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const changeHandler = () => {
    setIsTestCompleted(true);
  };

  return (
    <div>
      <h2>{t('test')}</h2>
      {isTestCompleted ? (
        <>
          <p>
            <Trans i18nKey={'testing.winner'} values={{ name }}>
              Поздравляю, <span style={{ color: '#9C56C7' }}>{name}</span>
            </Trans>
          </p>
          <div>Сертификат</div>
        </>
      ) : (
        <>
          <p>{t('testing.description')}</p>
          <div>
            <AudioBtn value={'?'} src={audio.a} />
            <TextArea
              value={valueArea}
              setValue={setValueArea}
              placeholder={t('testing.placeholder')}
            />
            <button onClick={changeHandler}>{t('testing.checkBtn')}</button>
          </div>
        </>
      )}
      <div>маскот</div>
    </div>
  );
};
