import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks/reduxHooks';
import { setTextLesson } from '../../app/store/reducers/appSlice';
import { resetLessonState } from '../../app/store/reducers/textTrainerSlice';
import dataRu from '../../data/textRu.json';

export const LessonSelect = (): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const lessonID = useAppSelector(({ app: { textLesson } }) => textLesson);
  const options = dataRu.map(({ id }, i: number): JSX.Element => {
    return (
      <option key={`lesson${id}`} value={id}>
        Урок {i + 1}
      </option>
    );
  });

  const selectLesson = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    const lesson = Number(value);
    dispatch(setTextLesson({ lesson }));
    dispatch(resetLessonState());
  };

  useEffect(() => {
    navigate(`/text/${lessonID}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  return (
    <select value={id} onChange={selectLesson}>
      {options}
    </select>
  );
};
