import { AudioBtnProps } from '../../types/interfaces';
import './index.scss';

export const AudioBtn = ({ value, src, className }: AudioBtnProps): JSX.Element => {
  return (
    <button className={`audio-element${className ? ` ${className}` : ''}`}>
      <span className="letter">{value}</span>
      <audio className="audio" controls src={src}></audio>
    </button>
  );
};
