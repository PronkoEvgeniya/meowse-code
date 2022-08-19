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
