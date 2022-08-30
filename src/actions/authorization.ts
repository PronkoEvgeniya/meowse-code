import axios from 'axios';

export const authorization = async (email: string | number, password: string | number) => {
  //   return async dispatch => {
  try {
    const response = await axios.post(
      'https://ancient-spire-30393.herokuapp.com/api/auth/authorization',
      {
        email,
        password,
      }
    );
    //   dispatch(setUser(response.data.user));
    localStorage.setItem('token', response.data.token);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data.message);
  }
  //   };
};
