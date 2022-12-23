/* eslint-disable camelcase */
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/api/';

const axiosInstance = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    Authorization: null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

// axiosInstance.interceptors.request.use(async (req) => {
//   console.log('request comes here first');
//   if (!authtoken) {
//     console.log('request comes here second');
//     authtoken = localStorage.getItem('access');
//     req.headers.Authorization = `Bearer ${authtoken}`;
//   }
//   const user = jwt_decode(authtoken);

//   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//   console.log('isExpired', isExpired);
//   if (!isExpired) return req;
//   console.log(refresh);
//   const response = await axios.post(`${baseURL}token/refresh/`, {
//     refresh,
//   });
//   localStorage.setItem('access', response.data.access);
//   localStorage.setItem('access', response.data.refresh);
//   req.headers.Authorization = `Bearer ${response.data.access}`;
//   return req;
// });

export default axiosInstance;
