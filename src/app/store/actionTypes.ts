import { TTrainers } from '../../types/types';

export interface ICompleteLessonAction {
  id: number;
  userScore: number;
  type: TTrainers;
}

export interface ICompletedLessons {
  [key: string]: number;
}

export interface ISetLessonAction {
  id: number;
  type: TTrainers;
}
