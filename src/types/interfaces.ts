import { TTrainers } from './types';

export interface ModalProps {
  setAuth: React.Dispatch<React.SetStateAction<string>>;
}

export interface AuthModalProps extends ModalProps {
  children: JSX.Element;
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

export interface InputLoginProps {
  value: string | number;
  type: string;
  placeholder: string;
  setValue: (value: string | number) => void;
}
