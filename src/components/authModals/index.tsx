import { IconStep } from '../../assets/Sprite';
import { AuthModalProps } from '../../types/interfaces';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  return (
    <div>
      <div>
        {children}
        <button onClick={() => setAuth('')}>
          <IconStep />
          Назад
        </button>
      </div>
    </div>
  );
};
