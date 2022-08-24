export interface ICompleteLessonAction {
  id: number;
  score: number;
}

export interface ICompletedLessons {
  [key: string]: number;
}
