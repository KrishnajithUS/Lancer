import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { userData, setToken } from '../Redux/reducer';

const baseURL = 'http://127.0.0.1:8000/api/';

const useAxios = () => {
  const authTokens = useSelector((state) => state.user.token.access);
  const dispatch = useDispatch();
  console.log(authTokens, 'this is use axios');
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: authTokens.refresh,
    });

    localStorage.setItem('access', response.data.access);
    localStorage.setItem('access', response.data.refresh);
    dispatch(userData(jwt_decode(response.data.access)));
    dispatch(setToken(response.data.refresh));
    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
