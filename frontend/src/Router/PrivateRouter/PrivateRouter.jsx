/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProfilePrivateRouter({ children }) {
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  return isAuth ? children : <Navigate to="/login" />;
}

export default ProfilePrivateRouter;
