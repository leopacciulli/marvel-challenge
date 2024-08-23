import axios from 'axios';
import md5 from 'md5';

const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY || '';
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY || '';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor to include the hash and other required params
api.interceptors.request.use(config => {
  const ts = new Date().getTime(); // Use current time as the timestamp
  const hash = md5(ts + privateKey + publicKey); // Generate the hash

  config.params = {
    ...config.params,
    ts,
    apikey: publicKey,
    hash,
  };

  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
