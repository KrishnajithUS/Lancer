import React from 'react';

function ContactSection({ status }) {
  return (
    <div className="w-full  mb-20 md:mb-14 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700  ">
      <div className="flex  flex-col items-center pt-4 pb-10">
        <img
          className="w-24 h-24 mb-3 rounded-full shadow-lg"
          src="/docs/images/people/profile-picture-3.jpg"
          alt="img"
        />
        <h5 className="mb-1 text-xl text-black font-medium text-black">
          Bonnie Green
        </h5>
        <span className="text-sm text-gray-500 text-gray-900">
          Visual Designer
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
          <div className="flex flex-col   mt-4 p-4  w-full rounded-lg border-2 shadow-lg border-gray-200">
            <div className="flex-initial w-64 font-bold text-lg">From</div>
            <div className="w-full">
              <h3>India</h3>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col mt-4 p-4  w-full rounded-lg border-2 shadow-lg border-gray-200">
            <div className="flex-initial w-50 font-bold text-lg">Bio</div>
            <div className="w-full">
              <h3>I am a Professional web developer</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSection;
