/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LogOut from '../Components/Constants/LogOut';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import SelectionPage from '../Pages/SelectionPage';
import FreelancerRegister from '../Pages/FreelancerRegister';
import Cprofile from '../Components/Client/Cprofile';
import Fprofile from '../Components/Freelancer/Fprofile';
import {
  ProfilePrivateRouter,
  RestrictLoggedInUser,
  FreelancerRouterPrivate,
} from './PrivateRouter/PrivateRouter';

const router = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/select" element={<SelectionPage />} />
        <Route
          path="/login"
          element={
            <RestrictLoggedInUser>
              <Login />
            </RestrictLoggedInUser>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/fregister" element={<FreelancerRegister />} />
        <Route
          path="/cprofile"
          element={
            <ProfilePrivateRouter>
              <Cprofile />
            </ProfilePrivateRouter>
          }
        />

        <Route
          path="/fprofile"
          element={
            <FreelancerRouterPrivate>
              <Fprofile />
            </FreelancerRouterPrivate>
          }
        />

        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </div>
  );
};

export default router;
