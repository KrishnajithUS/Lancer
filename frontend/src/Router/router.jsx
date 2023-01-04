/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable import/no-named-as-default */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../Components/Constants/Footer';

import LogOut from '../Components/Constants/LogOut';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import SelectionPage from '../Pages/SelectionPage';
import FreelancerRegister from '../Pages/FreelancerRegister';
import Cprofile from '../Components/Client/Cprofile';
import Fprofile from '../Components/Freelancer/Fprofile';
import AdminHome from '../Components/Admin/AdminHome';
import AdminLogin from '../Components/Admin/AdminLogin';

const router = () => {
  const userAuth = Boolean(useSelector((state) => state.user.user.isLoggedIn));

  const FAuth = Boolean(
    useSelector((state) => state.freelancer.Freelancer.isLoggedIn)
  );
  const adminAuth = Boolean(
    useSelector((state) => state.admin.admin.isLoggedIn)
  );

  if (!adminAuth) {
    return (
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/select" element={<SelectionPage />} />
          <Route
            path="/login"
            element={userAuth ? <Cprofile /> : FAuth ? <Fprofile /> : <Login />}
          />
          <Route
            path="/adminlogin"
            element={adminAuth ? <AdminHome /> : <AdminLogin />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/fregister" element={<FreelancerRegister />} />
          <Route
            path="/cprofile"
            element={userAuth ? <Cprofile /> : <Login />}
          />

          <Route
            path="/fprofile"
            element={FAuth ? <Fprofile /> : userAuth ? <Cprofile /> : <Login />}
          />

          <Route path="/logout" element={<LogOut />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Routes>
        <Route path="*" element={<AdminHome />} />
        <Route path="/dashboard" element={<AdminHome />} />
        <Route path="/logout" element={<LogOut />} />
      </Routes>
    </>
  );
};

export default router;
