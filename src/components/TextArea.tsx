import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setAnswer } from '../app/store/reducers/testingSlice';

export const TextArea = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { userAnswer } = useAppSelector(({ testing }) => testing);

  const areaHandler = ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const regexp = new RegExp('/^[a-z]+$/i');
    regexp.test(value);
    dispatch(setAnswer(value));
  };
  return (
    <textarea
      spellCheck={false}
      autoCorrect="off"
      value={userAnswer}
      placeholder={t('testing.placeholder')}
      onChange={areaHandler}
    />
  );
};
