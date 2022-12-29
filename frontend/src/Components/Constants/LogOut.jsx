import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
    navigate('/');
  }, []);

  return <div />;
}

export default LogOut;
