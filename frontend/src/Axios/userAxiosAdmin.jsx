/* eslint-disable comma-dangle */
/* eslint-disable no-debugger */
import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminUpdate, adminLogOut } from '../Redux/adminreducer';

const baseURL = 'http://127.0.0.1:8000/api/';

const useAxiosAdmin = () => {
  const authTokens = useSelector((state) => state.admin.admin.access_token);
  const authRefresh = useSelector((state) => state.admin.admin.refresh_token);
  const navigate = useNavigate();

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
    if (response.status === 401) {
      dispatch(adminLogOut());
      navigate('/login');
    }
    const token = { token: response.data };
    dispatch(adminUpdate(token));

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};

export default useAxiosAdmin;
