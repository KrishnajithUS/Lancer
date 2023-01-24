/* eslint-disable camelcase */
import axios from 'axios';

const baseURL = 'http://159.65.148.91/api/';

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
