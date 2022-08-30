import axios from 'axios';

export const registration = async (
  email: string | number,
  password: string | number,
  name: string | number
) => {
  try {
    const response = await axios.post(
      'https://ancient-spire-30393.herokuapp.com/api/auth/registration',
      {
        email,
        password,
        name,
      }
    );
    alert(response);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    alert(error.response.data.message);
  }
};
