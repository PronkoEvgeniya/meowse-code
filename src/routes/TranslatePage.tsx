import { useState } from 'react';
import { TextArea } from '../components/TextArea';
import { MORSE_TABLE } from '../types/constants';
import { TMorseTable } from '../types/types';

export const TranslatePage = (): JSX.Element => {
  const [valueArea, setValueArea] = useState('');
  const [valueResult, setValueResult] = useState('');

  const codeToMorse = (value: string): string => {
    const codes = Object.keys(MORSE_TABLE);
    let letters = value.split('');
    letters = letters.map((letter) =>
      codes.find((code) => code === letter) ? MORSE_TABLE[letter as TMorseTable] : letter
    );

    return letters.join(' ');
  };

  const translateHandler = () => {
    const result = codeToMorse(valueArea);
    setValueResult(result);
  };

  const clearHandler = () => {
    setValueArea('');
    setValueResult('');
  };

  return (
    <div>
      <h2>Переводчик</h2>
      <TextArea
        value={valueArea}
        setValue={setValueArea}
        placeholder="Введите текст для перевода..."
      />
      <div>
        <button onClick={translateHandler}>Перевести</button>
        <button onClick={clearHandler}>Сбросить</button>
      </div>
      <div>маскот</div>
      <TextArea
        value={valueResult}
        setValue={setValueResult}
        isDisabled={true}
        placeholder="Ваш переведенный текст"
      />
    </div>
  );
};
