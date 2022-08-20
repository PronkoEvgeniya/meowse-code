import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';

export const SignUpModal = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setAuthorization({ auth: true }));
    navigate('/tutorial');
  };

  return (
    <>
      <input type="text" placeholder="Логин" />
      <input type="text" placeholder="Имя" />
      <input type="text" placeholder="Пароль" />
      <input type="text" placeholder="Подтвердите пароль" />
      <button onClick={navigateHandler}>Регистрация</button>
    </>
  );
};
