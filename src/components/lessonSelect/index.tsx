/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Trans } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../../app/hooks/reduxHooks';
import { setLesson } from '../../app/store/reducers/appSlice';
import { toggleSelect } from '../../app/store/reducers/selectSlice';
import { resetLessonState } from '../../app/store/reducers/trainerSlice';
import { Trainers } from '../../types/constants';
import { ILessonProps } from '../../types/interfaces';
import './index.scss';

export const LessonSelect = ({ data, type }: ILessonProps): JSX.Element => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { textLesson, audioLesson, isActive } = useAppSelector(
    ({ app: { textLesson, audioLesson }, select: { isActive } }) => ({
      textLesson,
      audioLesson,
      isActive,
    })
  );
  const selectLesson = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    const { id: selectedID } = event.target as HTMLLabelElement;
    if (selectedID !== id) {
      dispatch(toggleSelect());
      dispatch(setLesson({ id: Number(selectedID), type }));
      dispatch(resetLessonState());
    }
  };

  let lessonID = 1;

  switch (type) {
    case Trainers.text:
      lessonID = textLesson;
      break;
    case Trainers.audio:
      lessonID = audioLesson;
  }

  const options = data.map((lesson, i: number): JSX.Element => {
    return (
      <>
        <input
          id={`lesson${lesson.id}`}
          value={lesson.id}
          className="input"
          // onClick={selectLesson}
          type="radio"
          name={`${type}-lesson`}
          disabled={lesson.id === Number(lessonID)}
        />
        <label
          htmlFor={`lesson${i}`}
          className="label"
          id={String(lesson.id)}
          onClick={selectLesson}
        >
          <Trans i18nKey={'lesson.select'} values={{ id: lesson.id }} />
        </label>
      </>
    );
  });

  const handleToggleSelect = () => {
    dispatch(toggleSelect());
  };

  useEffect(() => {
    navigate(`/${type}/${lessonID}`);
  }, [lessonID]);

  return (
    <div className={`custom-select ${isActive ? ' active' : ''}`} onClick={handleToggleSelect}>
      <div className="value">
        <Trans i18nKey={'lesson.select'} values={{ id }} />
      </div>
      <div className="arrow"></div>
      <div className="custom-options">{options}</div>
    </div>
  );
};
