import axios from 'axios';

const baseUrl = '/api/blogs';

let token: string = '';

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);

  return (request.then((response) => response.data));
};

const addNew = (newObject: unknown) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, newObject, config);

  console.log(request);
  return (request.then((response) => response.data));
};

export default { getAll, addNew, setToken };
