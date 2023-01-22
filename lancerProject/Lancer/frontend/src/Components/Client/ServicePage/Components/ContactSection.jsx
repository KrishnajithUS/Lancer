import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SmalllChatBox from '../Chat/SmalllChatBox';

function ContactSection({ status, dataN, post }) {
  const [modal, showModal] = useState('');
  console.log(post)
  const dataHandler = () => {
    showModal('showchat');
  };
  if (status) {
    return (
      <div className="w-full  mb-20 md:mb-14 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700  ">
        <div className="flex  flex-col items-center pt-4 pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={`http://localhost:8000${dataN.profile_picture}`}
            alt="img"
          />
          <h5 className="mb-1 text-xl text-black font-medium text-black">
            {dataN.user?.first_name}
          </h5>
          <span className="text-sm text-gray-500 text-gray-900">
            {dataN?.title}
          </span>
          <div className="flex  mt-4 space-x-3 md:mt-6">
            <button
              type="button"
              className="inline-flex  items-center px-4 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
            >
              Connect
            </button>
            {status ? (
              ''
            ) : (
              <button
                type="button"
                className="inline-flex items-center px-4 hover:text-white py-2 text-sm font-medium text-center text-gray-900 bg-white border border-green-700 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-200"
              >
                View Profile
              </button>
            )}
          </div>

          <div className="">
            <div className="flex flex-col items-center mt-4 p-4  w-full rounded-lg  border-gray-200">
              <div className="font-bold flex-auto w text-lg">Bio</div>
              <div className="m-2 flex-auto w text-center">
                <h3>{dataN.bio}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full  mb-20 md:mb-14 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700  ">
      <div className="flex  flex-col items-center pt-4 pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src={post.profile_picture}
          alt="img"
        />
        <h5 className="mb-1 text-xl text-black font-medium text-black">
          {post?.first_name}
        </h5>
        <span className="text-sm text-gray-500 text-gray-900">
          {post?.user_title}
        </span>
        <div className="flex  mt-4 space-x-3 md:mt-6">
          <button
            type="button"
            onClick={() => dataHandler()}
            className="inline-flex  items-center px-4 py-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            Message
          </button>
          {modal === 'showchat' && (
            <SmalllChatBox post={post} modal={modal} showModal={showModal} />
          )}
          {status ? (
            ''
          ) : (
            <Link to="/publicprofile">
              <button
                type="button"
                className="inline-flex items-center px-4 hover:text-white py-2 text-sm font-medium text-center text-gray-900 bg-white border border-green-700 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-200"
              >
                View Profile
              </button>
            </Link>
          )}
        </div>

        <div className="">
          <div className="flex flex-col items-center mt-4 p-4  w-full rounded-lg  border-gray-200">
            <div className="font-bold flex-auto w text-lg">Bio</div>
            <div className="m-2 flex-auto w text-center">
              <h3>{post.bio}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
