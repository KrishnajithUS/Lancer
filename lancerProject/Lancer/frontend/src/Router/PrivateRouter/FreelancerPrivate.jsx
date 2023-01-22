import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function FreelancerPrivate() {
  const FAuth = Boolean(
    useSelector((state) => state.freelancer.Freelancer.isLoggedIn),
  );
  console.log('fauth', FAuth);
  return FAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default FreelancerPrivate;
