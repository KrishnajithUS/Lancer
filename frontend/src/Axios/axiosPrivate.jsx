/* eslint-disable camelcase */
import axios from 'axios';

const baseURL = 'https://137.184.60.192/api/';

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
