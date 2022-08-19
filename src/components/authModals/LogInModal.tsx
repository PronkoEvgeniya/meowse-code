import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/reduxHooks';
import { setAuthorization } from '../../app/store/reducers/appSlice';

export const LogInModal = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateHandler = () => {
    dispatch(setAuthorization({ auth: true }));
    navigate('/home');
  };

  return (
    <>
      <input type="text" placeholder="Логин" />
      <input type="text" placeholder="Пароль" />
      <label>
        <input type="checkbox" />
        Запомнить меня
      </label>
      <button onClick={navigateHandler}>Войти</button>
    </>
  );
};
