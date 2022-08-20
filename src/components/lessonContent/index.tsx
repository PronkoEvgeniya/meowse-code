import React from 'react';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { ILesson } from '../../app/models/interfaces';

export const LessonContent = () => {
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const lessons = useAppSelector(({ app: { textData } }) => textData);
  const currentLesson = lessons.length
    ? lessons.find((lesson) => lesson.id === lessonID)
    : { description: '', symbols: [''], code: [''], task: '', id: 0 };
  const { description, symbols, code, task } = currentLesson as ILesson;
  const symbolsElements = symbols.map((symbol, i) => (
    <div key={symbol}>
      {symbol}: {code[i]}
    </div>
  ));

  return (
    <>
      <div>{description}</div>
      {symbolsElements}
      <div>{task.toUpperCase()} ?</div>
      <textarea placeholder="Ответ"></textarea>
      <button>Готово</button>
    </>
  );
};
