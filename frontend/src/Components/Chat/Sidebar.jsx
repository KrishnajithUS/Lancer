/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Sidebar({ chatData }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log(chatData);
  const fusername = useSelector(
    (state) => state.freelancer?.FreelancerDetails.username
  );
  const uusername = useSelector((state) => state.user?.userDetails.username);
  console.log(uusername);
  function createConversationName(username) {
    console.log(username, 'username inside function');
    const namesAlph = [username, fusername || uusername].sort();
    const name = `${namesAlph[0]}__${namesAlph[1]}`;
    console.log('conversation name', name);
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }
  return (
    <>
      <div className=" hidden md:block  ">
        <div className="col-span-1 bg-white border-r border-gray-300">
          <ul className="overflow-auto" style={{ height: 500 }}>
            <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
            {chatData.username?.map((item) => (
              <li>
                <button
                  type="button"
                  className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="username"
                  />
                  <div className="w-full pb-2">
                    <div className="flex justify-between">
                      {fusername ? (
                        <Link to={`/fchat/${createConversationName(item)}`}>
                          <span className="block ml-2 font-semibold text-base text-gray-600 ">
                            {item}
                          </span>
                        </Link>
                      ) : (
                        <Link to={`/chat/${createConversationName(item)}`}>
                          <span className="block ml-2 font-semibold text-base text-gray-600 ">
                            {item}
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="z-30 block md:hidden  relative bg-white border-r border-gray-300">
        <div className="absolute  z-40">
          <button
            onClick={() => {
              return setIsOpen(!isOpen);
            }}
            type="button"
            className="p-2 md:hidden "
          >
            {!isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5  fill-current text-dark"
              >
                <rect width="352" height="32" x="80" y="96" />
                <rect width="352" height="32" x="80" y="240" />
                <rect width="352" height="32" x="80" y="384" />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          <Transition
            className="z-40"
            show={isOpen}
            enter="transition ease-out duration-100 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-75 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className=" block md:hidden shadow-lg rounded-lg w-[180%] h-screen">
              <div className="bg-white rounded-lg border-r border-b border-gray-300">
                <ul className="overflow-auto" style={{ height: 500 }}>
                  <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">
                    Chats
                  </h2>
                  {chatData.username?.map((item) => (
                    <li>
                      <button
                        type="button"
                        className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                      >
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                          alt="username"
                        />
                        <div className="w-full pb-2">
                          <div className="flex justify-between">
                            {fusername ? (
                              <Link
                                to={`/fchat/${createConversationName(item)}`}
                              >
                                <span className="block ml-2 font-semibold text-base text-gray-600 ">
                                  {item}
                                </span>
                              </Link>
                            ) : (
                              <Link
                                to={`/chat/${createConversationName(item)}`}
                              >
                                <span className="block ml-2 font-semibold text-base text-gray-600 ">
                                  {item}
                                </span>
                              </Link>
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
