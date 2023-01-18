import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRouter() {
  const userAuth = Boolean(useSelector((state) => state.user.user.isLoggedIn));

  return userAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRouter;
