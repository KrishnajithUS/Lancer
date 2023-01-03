/* eslint-disable comma-dangle */
/* eslint-disable no-debugger */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { setToken } from '../Redux/reducer';
import { FsetToken } from '../Redux/Freducer';

const baseURL = 'http://127.0.0.1:8000/api/';

const useAxios = () => {
  const authTokens = useSelector((state) => state.user.token.access_token);
  const authRefresh = useSelector((state) => state.user.token.refresh_token);
  if (!authTokens) {
    const fauthTokens = useSelector(
      (state) => state.freelancer.token.access_token
    );

    const fauthRefresh = useSelector(
      (state) => state.freelancer.token.refresh_token
    );

    const axiosInstance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${fauthTokens}` },
    });
    const dispatch = useDispatch();

    axiosInstance.interceptors.request.use(async (req) => {
      const user = jwt_decode(fauthTokens);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

      if (!isExpired) return req;

      const response = await axios.post(`${baseURL}token/refresh/`, {
        refresh: fauthRefresh,
      });

      const token = { token: response.data };
      dispatch(FsetToken(token));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    });

    return axiosInstance;
  }

  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwt_decode(authTokens);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}token/refresh/`, {
      refresh: authRefresh,
    });

    const token = { token: response.data };
    dispatch(setToken(token));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
