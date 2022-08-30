import { useTranslation } from 'react-i18next';
import { IconStep } from '../../assets/Sprite';
import { AuthModalProps } from '../../types/interfaces';
import './modal.scss';

export const AuthModal = ({ setAuth, children }: AuthModalProps): JSX.Element => {
  const { t } = useTranslation();
  const changeModal = (value: string) => () => setAuth(value);

  return (
    <div className="modal-bg">
      <div className="modal-container">
        {children}
        <button className="btn-back" onClick={changeModal('')}>
          <IconStep />
          {t('start.backBtn')}
        </button>
      </div>
    </div>
  );
};
