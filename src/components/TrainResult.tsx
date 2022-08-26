import React from 'react';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../app/hooks/reduxHooks';
import { setTextLesson } from '../app/store/reducers/appSlice';
import { toggleMode } from '../app/store/reducers/textTrainerSlice';

export const TrainResult = (): JSX.Element => {
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { completedLessons, currentScore } = useAppSelector(({ textTrainer }) => textTrainer);
  const lessonScore = completedLessons ? completedLessons[lessonID] : 0;

  const handleReturnToTheLesson = () => {
    dispatch(toggleMode());
  };

  const handleStartNextLesson = () => {
    const lesson = Number(lessonID) + 1;
    dispatch(setTextLesson({ lesson }));
    dispatch(toggleMode());
    navigate(`/text/${lesson}`);
  };
  return lessonScore >= 70 ? (
    <div>
      <p>
        {`Поздравляю, ты прошел урок №${lessonID} Дай пять, ты набрал ${currentScore} очков! Пройти уровень ты можешь повторно, а я запомню только твой лучший результат - ${lessonScore}:\)`}
      </p>
      <button onClick={handleStartNextLesson}>Следующий урок!</button>
      <div>маскот</div>
    </div>
  ) : (
    <div>
      <p>
        {`Точность меньше 70%, придется пройти урок № ${lessonID} еще раз. Не расстраивайся, у меня тоже лапки!`}
      </p>
      <button onClick={handleReturnToTheLesson}>Заново!</button>
      <div>маскот</div>
    </div>
  );
};
