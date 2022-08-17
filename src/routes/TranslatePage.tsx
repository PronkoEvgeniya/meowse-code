import { useState } from 'react';

export const TranslatePage = (): JSX.Element => {
  const [valueArea, setValueArea] = useState('');
  return (
    <div>
      <h2>Переводчик</h2>
      <textarea
        cols={50}
        rows={10}
        spellCheck={false}
        autoCorrect="off"
        value={valueArea}
        placeholder="Введите текст для перевода..."
        onChange={(e) => setValueArea(e.target.value)}
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
