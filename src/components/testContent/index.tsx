import { useTranslation } from 'react-i18next';
import { TLang } from '../../types/types';
import { Lang } from '../../types/constants';
import { ITest } from '../../types/interfaces';
import { test } from '../../assets/audio/test/index';
import { AudioBtn } from '../audioButton';
import { getRandomTest } from './getRandomTest';
import dataRU from '../../data/testingRu.json';
import dataEN from '../../data/testingEn.json';
import { TestTextArea } from './TextArea';
import mascot from '../../assets/images/test-meows.png';

export const TestContent = (): JSX.Element => {
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const tasks = lang === Lang.ru ? dataRU : dataEN;
  const tests = test[lang as TLang];
  const currentTest = getRandomTest(tests.length);
  const { answer } = tasks.find((el) => el.task === currentTest) as ITest;

  return (
    <>
      <p>{t('testing.description')}</p>
      <div>
        <AudioBtn value={'?'} src={tests[currentTest]} />
        <img src={mascot} alt="" />
        <TestTextArea answer={answer} />
      </div>
    </>
  );
};
