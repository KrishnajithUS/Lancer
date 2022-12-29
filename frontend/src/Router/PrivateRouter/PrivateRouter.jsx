/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProfilePrivateRouter({ children }) {
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  return isAuth ? children : <Navigate to="/login" />;
}
function RestrictLoggedInUser({ children }) {
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  const isFreelancer = useSelector((state) => state.user.user.is_freelancer);
  console.log('freelancer status', isFreelancer);
  return isFreelancer && isAuth ? (
    <Navigate to="/fprofile" />
  ) : isAuth ? (
    <Navigate to="/cprofile" />
  ) : (
    children
  );
}
function FreelancerRouterPrivate({ children }) {
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  const isFreelancer = useSelector((state) => state.user.user.is_freelancer);
  return isFreelancer && isAuth ? (
    children
  ) : isAuth ? (
    <Navigate to="/cprofile" />
  ) : (
    <Navigate to="/login" />
  );
}
export { ProfilePrivateRouter, RestrictLoggedInUser, FreelancerRouterPrivate };
