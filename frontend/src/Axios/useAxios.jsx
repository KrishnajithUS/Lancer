/* eslint-disable comma-dangle */
/* eslint-disable no-debugger */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FlogOut, FsetToken, setRefreshInProgress } from '../Redux/Freducer';
import { logOut, setToken } from '../Redux/reducer';

const baseURL = 'http://137.184.60.192/api/';

const useAxios = () => {
  const navigate = useNavigate();
  const [refresh, setrefresh] = useState(null);
  const authTokens = useSelector((state) => state.user.token.access_token);
  const authRefresh = useSelector((state) => state.user.token.refresh_token);
  if (!authTokens) {
    const fauthTokens = useSelector(
      (state) => state.freelancer.token.access_token
    );

    const fauthRefresh = useSelector(
      (state) => state.freelancer.token.refresh_token
    );
    const refreshInProgress = useSelector(
      (state) => state.freelancer.refreshInProgress
    );
    const axiosInstance = axios.create({
      baseURL,
      headers: { Authorization: `Bearer ${fauthTokens}` },
    });
    const dispatch = useDispatch();

    axiosInstance.interceptors.request.use(async (req) => {
      const user = jwt_decode(fauthTokens);
      const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
      console.log('isExpired', isExpired);

      if (!isExpired || Boolean(refreshInProgress)) return req;

      console.log('sending refresh token', fauthRefresh);
      try {
        dispatch(setRefreshInProgress(true));
        const response = await axios.post(`${baseURL}token/refresh/`, {
          refresh: fauthRefresh,
        });
        console.log('refresh token in use axios', response.data);

        const token = { token: response.data };
        dispatch(FsetToken(token));

        dispatch(setRefreshInProgress(false));

        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } catch {
        dispatch(FlogOut());
        navigate('/login');
        return req;
      }
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
      refresh: refresh || authRefresh,
    });
    if (response.status === 401) {
      dispatch(logOut());
      navigate('/login');
    }
    setrefresh(response.data.refresh);
    const token = { token: response.data };
    dispatch(setToken(token));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxios;
