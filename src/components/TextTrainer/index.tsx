import React, { useEffect, useState } from 'react';
import { setDataToLS } from './setDataToLS';
import { Lesson } from './Lesson';
import { ILesson } from './models/interfaces';

export const TextTrainer = (): JSX.Element => {
  const [options, setOptions] = useState<[] | JSX.Element[]>([]);
  const [lesson, setLessson] = useState(<div></div>);
  useEffect(() => {
    setDataToLS();
    const lessons = JSON.parse(localStorage.getItem('textTrainer') as string);
    console.log(lessons[0]);
    const newElements = lessons.map(({ id }: ILesson, i: number): JSX.Element => {
      return (
        <option key={id} value={id}>
          Урок {i + 1}
        </option>
      );
    });
    const newLesson = <Lesson lesson={lessons[0]} />;
    setOptions(newElements);
    setLessson(newLesson);
  }, []);

  return (
    <>
      <h1>Текстовый тренажер</h1>
      <select name="lessons" id="tt-lessons">
        {options}
      </select>
      {lesson}
      <div></div>
    </>
  );
};
