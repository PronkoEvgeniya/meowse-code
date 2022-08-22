import { AudioBtnProps } from '../../types/interfaces';

export const AudioBtn = ({ value, src }: AudioBtnProps): JSX.Element => {
  return (
    <button>
      <span>{value}</span>
      <audio controls src={src}></audio>
    </button>
  );
};
