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
import Otp from '../Components/Constants/Otp';
import LogOut from '../Components/Constants/LogOut';
import Home from '../Pages/Home';
import Login from '../Pages/Login';

import Register from '../Pages/Register';
import SelectionPage from '../Pages/SelectionPage';
import FreelancerRegister from '../Pages/FreelancerRegister';
import Cprofile from '../Components/Client/Cprofile';
import Fprofile from '../Components/Freelancer/Fprofile';
import Navbar from '../Components/Constants/Navbar';
import AdminHome from '../Components/Admin/AdminHome';
import Service from '../Components/Client/ServicePage/Service';
import AdminLogin from '../Components/Admin/AdminLogin';
import Post from '../Components/Freelancer/Post';
import AddPost from '../Components/Freelancer/AddPost';
import UpdatePost from '../Components/Freelancer/UpdatePost';
import Packages from '../Components/Freelancer/Packages';
import PostDetailPage from '../Components/Client/ServicePage/PostDetailPage';
import PublicProfile from '../Components/Freelancer/PublicProfile';
import Payment from '../Components/Freelancer/Payment';
import PrivateRouter from './PrivateRouter/PrivateRouter';
import Public from './PrivateRouter/Public';
import FreelancerPrivate from './PrivateRouter/FreelancerPrivate';
import Chat from '../Pages/Chat';
// import Chat from '../Components/Chat/Chat';

const router = () => {
  const adminAuth = Boolean(
    useSelector((state) => state.admin.admin.isLoggedIn)
  );

  if (!adminAuth) {
    console.log('router');
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/logout" element={<LogOut />} />

          <Route path="*" element={<Home />} />
          <Route element={<PrivateRouter />}>
            <Route path="/cprofile" element={<Cprofile />} />
            <Route path="/services" element={<Service />} />

            <Route path="/fprofile" element={<Fprofile />} />

            <Route path="/publicprofile" element={<PublicProfile />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chat/:conversationName" element={<Chat />} />

          </Route>
          <Route element={<FreelancerPrivate />}>
            <Route path="/fchat/" element={<Chat />} />

            <Route path="/fchat/:conversationName" element={<Chat />} />
            <Route path="/post" element={<Post />} />
            <Route path="/addpost" element={<AddPost />} />
            <Route path="/updatepost/:id" element={<UpdatePost />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/postDetails" element={<PostDetailPage />} />
            <Route path="/payment/:id" element={<Payment />} />
          </Route>
          <Route element={<Public />}>
            <Route path="/" element={<Home />} />
            <Route path="/select" element={<SelectionPage />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/fregister" element={<FreelancerRegister />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verifyotp/:id" element={<Otp />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* <Route path="/chat" element={<Chat />} /> */}
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
