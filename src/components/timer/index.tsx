import React from 'react';
import { useTimer } from '../../app/hooks/useTimer';
import { ITimerProps } from '../../types/interfaces';

export const Timer = ({ initialDate, targetMinutes, handleTimerEnd }: ITimerProps) => {
  const miliseconds = initialDate + 1000 * 60 * targetMinutes;
  const [hours, minutes, seconds] = useTimer(miliseconds);
  if (hours + minutes + seconds === 0) handleTimerEnd();

  return (
    <div>{`${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${
      seconds >= 10 ? seconds : `0${seconds}`
    }`}</div>
  );
};
