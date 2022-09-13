import { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../app/hooks/reduxHooks';
import {
  setAnswer,
  setAnswerValidity,
  setCompleteness,
  setHandleSubmit,
  setResult,
} from '../../app/store/reducers/testingSlice';
import { enterKey, RegExpTemplates, testPercent } from '../../types/constants';
import { TextAreaProps } from '../../types/interfaces';
import { TLang } from '../../types/types';

export const TestTextArea = ({ answer }: TextAreaProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();
  const { userAnswer, isAnswerValid, isHandleSubmit } = useAppSelector(({ testing }) => testing);

  const countResult = useCallback((): void => {
    const rightAnswers = userAnswer
      .toLowerCase()
      .split('')
      .map((el, idx) => el === answer[idx])
      .filter((el) => el).length;

    const result = Math.round((rightAnswers * testPercent) / answer.length);
    dispatch(setResult(result));
  }, [answer, dispatch, userAnswer]);

  const areaHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const regexp = new RegExp(RegExpTemplates[lang as TLang], RegExpTemplates.iFlag);
    if (regexp.test(value)) {
      dispatch(setAnswerValidity(true));
    } else {
      dispatch(setAnswerValidity(false));
    }

    dispatch(setAnswer(value));
  };

  const enterHandler = ({ key }: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (key === enterKey) {
      dispatch(setHandleSubmit(true));
    } else {
      dispatch(setHandleSubmit(false));
    }
  };

  useEffect(() => {
    if (userAnswer.length === answer.length || isHandleSubmit) {
      countResult();
      dispatch(setCompleteness(true));
    }
  }, [answer, countResult, dispatch, isHandleSubmit, userAnswer]);

  return (
    <>
      <textarea
        spellCheck={false}
        autoCorrect="off"
        value={userAnswer}
        placeholder={t('testing.placeholder')}
        onChange={areaHandler}
        onKeyDown={enterHandler}
      />
      {!isAnswerValid && <div>{t('testing.error')}</div>}
    </>
  );
};
