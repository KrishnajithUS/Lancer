/* eslint-disable camelcase */
import axios from 'axios';

const baseURL = 'https://lan-cer.online/api/';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export default axiosInstance;
