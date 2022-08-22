import { TextAreaProps } from '../types/interfaces';

export const TextArea = ({ value, placeholder, setValue }: TextAreaProps): JSX.Element => {
  return (
    <textarea
      spellCheck={false}
      autoCorrect="off"
      value={value}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
