import { Dispatch } from 'react';

interface TrainResultProps {
  answer: string;
  setAnswer: Dispatch<React.SetStateAction<string>>;
  setIsLessonCompleted: Dispatch<React.SetStateAction<boolean>>;
}

export const TrainResult = ({
  answer,
  setAnswer,
  setIsLessonCompleted,
}: TrainResultProps): JSX.Element => {
  const againHandler = () => {
    setAnswer('');
    setIsLessonCompleted(false);
  };

  return answer.length > 2 ? (
    <div>
      <p>
        Дай пять, ты набрал {answer.length} очков в этом уровне! Пройти уровень ты можешь повторно,
        я запомню только лучший результат :)
      </p>
      <button>Следующий урок!</button>
      <div>маскот</div>
    </div>
  ) : (
    <div>
      <p>
        Точность меньше 70%, придется пройти уровень еще раз. Не расстраивайся, у меня тоже лапки!
      </p>
      <button onClick={againHandler}>Заново!</button>
      <div>маскот</div>
    </div>
  );
};
