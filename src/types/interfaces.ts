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

export interface TextAreaProps {
  value: string;
  placeholder: string;
  isDisabled?: boolean;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
