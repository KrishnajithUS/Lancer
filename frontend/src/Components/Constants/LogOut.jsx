/* eslint-disable no-debugger */
/* eslint-disable semi */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useAxios from '../../Axios/useAxios';
import { logOut } from '../../Redux/reducer';
import { FlogOut } from '../../Redux/Freducer';
import { adminLogOut } from '../../Redux/adminreducer';

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = useAxios();
  useEffect(() => {
    api.post('logout/');

    dispatch(logOut());
    dispatch(FlogOut());

    dispatch(adminLogOut());

    navigate('/');
  }, []);

  return <div />;
}

export default LogOut;
