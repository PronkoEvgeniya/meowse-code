import { useState } from 'react';
import { AudioBtn } from '../components/audioButton';
import { TextArea } from '../components/TextArea';

export const TestPage = (): JSX.Element => {
  const [valueArea, setValueArea] = useState('');
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  const changeHandler = () => {
    setIsTestCompleted(true);
  };

  return (
    <div>
      <h2>Тестирование</h2>
      {isTestCompleted ? (
        <>
          <p>
            Поздравляю, <span>Евгения</span>, с успешным прохождением курса по изучению азбуки
            Морзе! Награждаю тебя сертификатом, ты можесь скачать его и распечатать
          </p>
          <div>Сертификат</div>
        </>
      ) : (
        <>
          <p>
            Вижу, ты уже готов испытать себя! За успешное прохождение этого раздела я тебя награжу.
            Твоя задача разгадать шифр: прослушай код Морзе и введи расшифровку в текстовое поле
            внизу
          </p>
          <div>
            <AudioBtn value="?" src="#" />
            <TextArea
              value={valueArea}
              setValue={setValueArea}
              placeholder="Введи сюда расшифровку..."
            />
            <button onClick={changeHandler}>Проверить</button>
          </div>
        </>
      )}
      <div>маскот</div>
    </div>
  );
};
