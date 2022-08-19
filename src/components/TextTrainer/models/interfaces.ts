export interface ILessonProps {
  lesson: ILesson;
}

export interface ILesson {
  id: string;
  description: string;
  symbols: string[] | string;
  code: string[] | string;
  score: number;
  task: string;
  answer: string;
}
