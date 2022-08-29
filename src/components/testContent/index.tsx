import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import { setAnswer, setCompleteness } from '../../app/store/reducers/testingSlice';
import { TLang } from '../../types/types';
import { Lang } from '../../types/constants';
import { ITest } from '../../types/interfaces';
import { test } from '../../assets/audio/test/index';
import { AudioBtn } from '../audioButton';
import { getRandomTest } from './getRandomTest';
import dataRU from '../../data/testingRu.json';
import dataEN from '../../data/testingEn.json';
import { useEffect } from 'react';
import { TextArea } from '../TextArea';

export const TestContent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const tasks = lang === Lang.ru ? dataRU : dataEN;
  const tests = test[lang as TLang];
  const currentTest = getRandomTest(tests.length);
  const { answer } = tasks.find((el) => el.task === currentTest) as ITest;
  const { userAnswer, result, isAnswerValid, isCompleted } = useAppSelector(
    ({ testing }) => testing
  );
  console.log(lang, '---', currentTest);
  // const areaHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
  //   const regexp = new RegExp('/^[a-z]+$/i');
  //   regexp.test(value);
  //   dispatch(setAnswer(value));
  // };

  const changeHandler = () => {
    dispatch(setCompleteness(true));
  };

  return (
    <>
      <p>{t('testing.description')}</p>
      <span>{currentTest}</span>
      <div>
        <AudioBtn value={'?'} src={tests[currentTest]} />
        <TextArea />
        {/* <textarea
          value={userAnswer}
          placeholder={t('testing.placeholder')}
          onChange={areaHandler}
        /> */}
        <button onClick={changeHandler}>{t('testing.checkBtn')}</button>
      </div>
    </>
  );
};
