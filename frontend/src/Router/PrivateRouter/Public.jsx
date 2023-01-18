/* eslint-disable no-nested-ternary */
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Cprofile from '../../Components/Client/Cprofile';
import Fprofile from '../../Components/Freelancer/Fprofile';

function Public() {
  const FAuth = Boolean(
    useSelector((state) => state.freelancer.Freelancer.isLoggedIn),
  );
  const userAuth = Boolean(useSelector((state) => state.user.user.isLoggedIn));
  console.log('public roure');
  return userAuth ? <Cprofile /> : FAuth ? <Fprofile /> : <Outlet />;
}

export default Public;
