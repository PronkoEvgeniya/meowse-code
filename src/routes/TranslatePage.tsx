import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { useMorse } from '../app/hooks/useMorse';
import { setCodeType, setInput, setOutput } from '../app/store/reducers/translatorSlice';

export const TranslatePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { codeToMorse, decodeMorse } = useMorse();
  const { input, output, codeType } = useAppSelector(({ translator }) => translator);

  const areaHandler = ({ target: { id, value } }: React.ChangeEvent<HTMLTextAreaElement>) => {
    id === 'input' ? dispatch(setInput(value)) : dispatch(setOutput(value));
  };

  const toggleMode = () => {
    codeType ? dispatch(setCodeType(null)) : dispatch(setCodeType('ru'));
    clearHandler();
  };

  const changeLang = () => {
    codeType === 'ru' ? dispatch(setCodeType('en')) : dispatch(setCodeType('ru'));
    clearHandler();
  };

  const translateHandler = () => {
    let result = '';
    if (codeType) {
      result = input
        .split('  ')
        .map((word) => decodeMorse(word))
        .join(' ');
    } else {
      result = codeToMorse(input);
    }

    dispatch(setOutput(result));
  };

  const clearHandler = () => {
    dispatch(setInput(''));
    dispatch(setOutput(''));
  };

  return (
    <div>
      <h2>Переводчик</h2>
      <div>
        <button onClick={toggleMode}>{codeType ? 'морзе -> текст' : 'текст -> морзе'}</button>
        {codeType && <button onClick={changeLang}>{codeType}</button>}
      </div>
      <textarea
        id="input"
        value={input}
        placeholder="Введите текст для перевода..."
        onChange={areaHandler}
      />
      <div>
        <button onClick={translateHandler}>Перевести</button>
        <button onClick={clearHandler}>Сбросить</button>
      </div>
      <div>маскот</div>
      <textarea
        id="output"
        value={output}
        placeholder="Ваш переведенный текст"
        disabled
        onChange={areaHandler}
      />
    </div>
  );
};
