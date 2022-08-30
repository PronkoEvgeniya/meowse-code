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
  answer: string[];
}

export interface ILesson {
  id: number;
  description: string;
  symbols: string[];
  code: string[];
  score: number;
  task: string;
  answer: string[];
}

export interface ITest {
  task: number;
  answer: string[];
}
