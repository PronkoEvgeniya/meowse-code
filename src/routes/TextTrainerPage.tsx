// import { TrainResult } from '../components/TrainResult';
import React from 'react';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';

export const TextTrainerPage = (): JSX.Element => {
  return (
    <div>
      <h2>Текстовый тренажер</h2>
      <LessonSelect />
      <LessonContent />
      {/* <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={completeHandler}>Отправить</button> */}
    </div>
  );
};
