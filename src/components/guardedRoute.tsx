import { Navigate } from 'react-router-dom';

interface Props {
  auth: boolean;
  children: JSX.Element;
}

export const GuardedRoute = ({ auth, children }: Props): JSX.Element => {
  return auth ? children : <Navigate to="/" />;
};
