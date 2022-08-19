import React, { useEffect, useState } from 'react';
import { setDataToLS } from './setDataToLS';
import { Lesson } from './Lesson';
import { ILesson } from './models/interfaces';

export const TextTrainer = (): JSX.Element => {
  const [options, setOptions] = useState<[] | JSX.Element[]>([]);
  const [lessons, setLesssons] = useState<[] | ILesson[]>([
    {
      id: '1',
      description: '',
      symbols: '',
      code: '',
      score: 0,
      task: '',
      answer: '',
    },
  ]);
  const [selectedLesson, setSelectedLessson] = useState('1');
  useEffect(() => {
    setDataToLS();
    const lessons = JSON.parse(localStorage.getItem('textTrainer') as string);
    const newElements = lessons.map(({ id }: ILesson, i: number): JSX.Element => {
      return (
        <option key={id} value={id}>
          Урок {i + 1}
        </option>
      );
    });
    setLesssons(lessons);
    setSelectedLessson(lessons[0].id);
    setOptions(newElements);
  }, [lessons]);

  useEffect(() => {
    console.log(lessons.find((lesson: ILesson) => lesson.id === selectedLesson) as ILesson);
  }, [selectedLesson, lessons]);

  const selectLesson = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLessson(target.value);
  };

  return (
    <>
      <h1>Текстовый тренажер</h1>
      <select name="lessons" id="tt-lessons" value={selectedLesson} onChange={selectLesson}>
        {options}
      </select>
      <Lesson
        key="lesson"
        lesson={lessons.find((lesson: ILesson) => lesson.id === selectedLesson) as ILesson}
      />
      <div></div>
    </>
  );
};
