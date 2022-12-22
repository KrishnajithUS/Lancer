/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Navbar from '../Constants/Navbar';

function Cprofile() {
  return (
    <div className="w-full">
      <Navbar />
      <div className="flex  justify-center items-center  h-48 mx-4 mt-2 bg-black">
        <div className="rounded-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-full w-24 h-24"
            alt="Avatar"
          />
        </div>
      </div>
      <div className="w-full flex justify-center md:h-60 h-96 ">
        <div className="w-3/4  shadow-2xl">
          <div className="flex justify-center  md:pl-0 md:justify-center pt-4">
            <h1 className="md:mr-0  text-2xl">Personal Details</h1>
          </div>
          <div className="flex justify-center ">
            <div className="grid gap-6 grid-cols-6 justify-center items-center pt-4   md:grid-cols-2 grid-col-1">
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Username:</span>
                <span className="pl-3">krishnajith</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>FirstName:</span>
                <span className="col-start-1 col-end-7 pl-2">krishnajith</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Last Name:</span>
                <span className="pl-2">U S</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Email:</span>
                <span className="pl-2">krishnajithuse@gmail.com</span>
              </div>

              <button className="col-start-1 col-end-7 mx-4 md:col-span-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cprofile;
