import { Navigate } from 'react-router-dom';

interface Props {
  auth: boolean;
  component: () => JSX.Element;
}

export const GuardedRoute = ({ auth, component: Component }: Props): JSX.Element => {
  return auth ? <Component /> : <Navigate to="/" />;
};
