import axios from 'axios';
import { LoginToken } from '../utils/type';

const baseUrl = '/api/login';

interface Credentials {
  username: string,
  password: string,
}

const login = async (credentials: Credentials): Promise<LoginToken> => {
  const response = await axios.post(baseUrl, credentials);

  return (response.data);
};

const verifyToken = async (token: string): Promise<number> => {
  const cleanedToken = token.replace(/^"|"$/g, '');
  const config = {
    headers: {
      Authorization: `Bearer ${cleanedToken}`,
    },
  };
  const response = await axios.get(`${baseUrl}/token`, config);

  return (response.status);
};

export default { login, verifyToken };
