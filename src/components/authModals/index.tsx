import { AuthModalProps } from '../../types/interfaces';
import paw from './paw.svg';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  return (
    <div>
      <div>
        {children}
        <button onClick={() => setAuth('')}>
          <img src={paw} alt="paw" />
          Назад
        </button>
      </div>
    </div>
  );
};
