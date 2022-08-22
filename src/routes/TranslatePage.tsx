import { useState } from 'react';
import { TextArea } from '../components/TextArea';

export const TranslatePage = (): JSX.Element => {
  const [valueArea, setValueArea] = useState('');

  return (
    <div>
      <h2>Переводчик</h2>
      <TextArea
        value={valueArea}
        setValue={setValueArea}
        placeholder="Введите текст для перевода..."
      />
      <div>
        <button>Перевести</button>
        <button onClick={() => setValueArea('')}>Сбросить</button>
      </div>
      <div>маскот</div>
      <p>Ваш переведенный текст</p>
    </div>
  );
};
