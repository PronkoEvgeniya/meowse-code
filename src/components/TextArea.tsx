import { TextAreaProps } from '../types/interfaces';

export const TextArea = ({
  value,
  placeholder,
  setValue,
  isDisabled = false,
}: TextAreaProps): JSX.Element => {
  return (
    <textarea
      spellCheck={false}
      autoCorrect="off"
      value={value}
      placeholder={placeholder}
      disabled={isDisabled}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
