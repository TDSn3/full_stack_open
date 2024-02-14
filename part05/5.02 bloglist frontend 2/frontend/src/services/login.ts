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

export default { login };
