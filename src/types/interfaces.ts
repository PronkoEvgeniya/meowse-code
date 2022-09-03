import { TTrainers } from './types';

export interface AuthModalProps {
  auth: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export interface TrainResultProps {
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIsLessonCompleted: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AudioBtnProps {
  value: string;
  src: string;
}

export interface ITimerProps {
  initialDate: number;
  targetMinutes: number;
  handleTimerEnd: () => void;
}

export interface IGameQuestionProps {
  questions: IQuestion[];
  date: number;
}

interface IQuestion {
  task: string;
  answers: string[];
}

export interface IAnswerFieldProps {
  answer: string[];
  score: number;
  type: TTrainers;
}

export interface TextAreaProps {
  answer: string[];
}

interface ITypeProps {
  type: TTrainers;
  data: (ITextLesson | IAudioLesson)[];
}

export type ITrainResultProps = ITypeProps;

export type ILessonProps = ITypeProps;

export interface IAudioSrc {
  [key: string]: string;
}

export interface ILesson {
  id: number;
  description: string;
  symbols: string[];
  score: number;
  task: string;
  answer: string[];
}

export interface ITextLesson extends ILesson {
  code: string[];
}

export interface IAudioLesson extends ILesson {
  player: string[];
}

export interface ITest {
  task: number;
  answer: string[];
}

export interface IAuthorization {
  email: string;
  password: string;
}

export interface IRegistration extends IAuthorization {
  name: string;
}

export interface IUser {
  data: {
    token: string;
    user: {
      name: string;
    };
  };
}

export interface IAuthError {
  response: {
    data: {
      message: string;
    };
  };
}
