import { TTrainers } from '../../types/types';

export interface ICompleteLessonAction {
  id: number;
  userScore: number;
  type: TTrainers;
  lang: string;
}

export interface ICompletedLessons {
  [key: string]: number;
}

export interface ISetLessonAction {
  id: number;
  type: TTrainers;
}
