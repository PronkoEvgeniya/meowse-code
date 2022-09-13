import { setName, setEmail, setPassword, setConfirmPassword } from '../store/reducers/userSlice';
import { useAppDispatch } from './reduxHooks';

export const useClear = () => {
  const dispatch = useAppDispatch();

  const clear = () => {
    dispatch(setName(''));
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    dispatch(setConfirmPassword(''));
  };

  return clear;
};
