import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { useMorse } from '../app/hooks/useMorse';
import { setLanguage, setInput, setOutput } from '../app/store/reducers/translatorSlice';
import { Lang } from '../types/constants';

export const TranslatePage = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { encode, decode } = useMorse();
  const { input, output, language } = useAppSelector(({ translator }) => translator);

  const areaHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    dispatch(setInput(value));
  };

  const toggleMode = (): void => {
    if (language) {
      dispatch(setLanguage(null));
    } else {
      dispatch(setLanguage(i18n.language));
    }

    clearHandler();
  };

  const changeLang = (): void => {
    if (language === Lang.ru) {
      dispatch(setLanguage(Lang.en));
    } else {
      dispatch(setLanguage(Lang.ru));
    }

    clearHandler();
  };

  const translateHandler = (): void => {
    let result: string[];

    if (language) {
      result = input.split('  ').map(decode);
    } else {
      result = input.split(' ').map(encode);
    }

    dispatch(setOutput(result));
  };

  const clearHandler = (): void => {
    dispatch(setInput(''));
    dispatch(setOutput([]));
  };

  return (
    <div>
      <h2>{t('translate')}</h2>
      <div>
        <button onClick={toggleMode}>{language ? t('decode') : t('encode')}</button>
        {language && <button onClick={changeLang}>{language}</button>}
      </div>
      <textarea value={input} placeholder={t('translator.placeholder')} onChange={areaHandler} />
      <div>
        <button onClick={translateHandler}>{t('translator.translate')}</button>
        <button onClick={clearHandler}>{t('translator.reset')}</button>
      </div>
      <div>маскот</div>
      <div style={{ border: '1px solid purple', padding: '20px' }}>
        {output.map((word, idx) => (
          <span key={idx} style={{ border: '1px solid green', margin: '5px', padding: '5px' }}>
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};
