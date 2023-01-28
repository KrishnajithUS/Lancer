import React from 'react';
import { useSelector } from 'react-redux';

function EmptyChatComponent() {
  const currentUser = useSelector((state) => state.user.userDetails.username);
  const fcurrentUser = useSelector(
    (state) => state.freelancer.FreelancerDetails.username,
  );
  return (
    <div className="h-full md:w-full w-full flex flex-col  items-center justify-center  bg-gray-100  p-4">
      <p className="max-w-lg text-2xl sm:text-3xl font-semibold leading-normal text-gray-900 font-mono">
        Welcome,
        {' '}
        {currentUser || fcurrentUser}
      </p>
      <p className=" text-center sm:text-2xl   font-semibold leading-normal text-gray-900 font-mono">
        Please select a chat to Start Messaging
      </p>
      <div className="imgwrap w-80 h-80 block text-center">
        <img
          src="https://miro.medium.com/max/455/0*UQB_ZhdqqQ6HkRuj.gif"
          alt=""
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default EmptyChatComponent;
