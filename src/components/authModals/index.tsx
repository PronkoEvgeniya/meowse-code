import { useTranslation } from 'react-i18next';
import { IconStep } from '../../assets/Sprite';
import { AuthModalProps } from '../../types/interfaces';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();
  const changeModal = (value: string) => () => setAuth(value);

  return (
    <div>
      <div>
        {children}
        <button onClick={changeModal('')}>
          <IconStep />
          {t('start.backBtn')}
        </button>
      </div>
    </div>
  );
};
