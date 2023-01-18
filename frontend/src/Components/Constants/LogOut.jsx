/* eslint-disable no-debugger */
/* eslint-disable semi */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axiosInstance from '../../Axios/axiosPrivate';
import { logOut } from '../../Redux/reducer';
import { FlogOut } from '../../Redux/Freducer';
import { adminLogOut } from '../../Redux/adminreducer';

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("hello")
    axiosInstance.post('logout/');

    dispatch(logOut());
    dispatch(FlogOut());

    dispatch(adminLogOut());

    navigate('/');
  }, []);

  return <div />;
}

export default LogOut;
