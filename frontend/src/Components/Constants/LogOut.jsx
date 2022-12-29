/* eslint-disable no-debugger */
/* eslint-disable semi */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PURGE } from 'redux-persist';
import useAxios from '../../Axios/useAxios';
import { logOut } from '../../Redux/reducer';

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    const response = api.post('logout/');
    console.log(response);
    dispatch(logOut());

    localStorage.removeItem('persist:root');

    navigate('/');
  }, []);

  return <div />;
}

export default LogOut;
