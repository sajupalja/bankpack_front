import axios from 'axios';

const createInstance = () => {
  return axios.create({
    baseURL: 'http://bankpack.169.56.174.130.nip.io',
    headers: {
      'Content-type': 'application/json',
    },
  });
};

const instance = createInstance();

export default instance;