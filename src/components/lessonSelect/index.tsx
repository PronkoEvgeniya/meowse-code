import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks/reduxHooks';
import { setLesson } from '../../app/store/reducers/appSlice';
import { resetLessonState } from '../../app/store/reducers/trainerSlice';
import { ILessonProps } from '../../types/interfaces';

export const LessonSelect = ({ data, type }: ILessonProps): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { textLesson, audioLesson } = useAppSelector(({ app: { textLesson, audioLesson } }) => ({
    textLesson,
    audioLesson,
  }));
  const options = data.map(({ id }, i: number): JSX.Element => {
    const number = i + 1;
    return (
      <option key={`lesson${id}`} value={id}>
        <Trans i18nKey={'lesson.select'} values={{ number }} />
      </option>
    );
  });

  let lessonID: number;

  switch (type) {
    case 'text':
      lessonID = textLesson;
      break;
    case 'audio':
      lessonID = audioLesson;
  }

  const selectLesson = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    const id = Number(value);
    dispatch(setLesson({ id, type }));
    dispatch(resetLessonState());
  };

  useEffect(() => {
    navigate(`/${type}/${lessonID}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  return (
    <select value={id} onChange={selectLesson}>
      {options}
    </select>
  );
};
