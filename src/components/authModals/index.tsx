import { useTranslation } from 'react-i18next';
import { IconStep } from '../../assets/Sprite';
import { AuthModalProps } from '../../types/interfaces';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div>
      <div>
        {children}
        <button onClick={() => setAuth('')}>
          <IconStep />
          {t('start.backBtn')}
        </button>
      </div>
    </div>
  );
};
