export interface ICompleteLessonAction {
  id: number;
  userScore: number;
}

export interface ICompletedLessons {
  [key: string]: number;
}
