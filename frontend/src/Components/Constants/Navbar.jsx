/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-confusing-arrow */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { BsFillChatLeftTextFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { notification } from '../../Redux/notificationreducer';
import logo from '../../Assets/logo.png';
// eslint-disable-next-line react/function-component-definition
const Navbar = () => {
  notification();
  const count = useSelector((state) => state.notification.unreadMessageCount);
  console.log('the count', count);
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  const FisAuth = useSelector(
    (state) => state.freelancer.Freelancer.isLoggedIn
  );
  const fusername = useSelector(
    (state) => state.freelancer?.FreelancerDetails?.username
  );
  const fprofile_picture = useSelector(
    (state) => state.freelancer?.FreelancerDetails?.profile_picture
  );
  const femail = useSelector(
    (state) => state.freelancer?.FreelancerDetails?.email
  );

  const username = useSelector((state) =>
    state.user.userDetails
      ? state.user.userDetails.username
      : state.freelancer.FreelancerDetails.username
  );
  console.log(
    'usernamehe',
    useSelector((state) => state.freelancer.FreelancerDetails.username)
  );
  const email = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.email : null
  );
  const profile_picture = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.profile_picture : null
  );
  return (
    <div className="sticky top-0 mb-0 z-50  shadow-sm shadow-purple-400">
      <header>
        <div className="">
          <nav className="bg-white font-sans  ">
            <div className="w-full mx-auto px-4  ">
              <div className="flex items-center justify-end h-16 ">
                <div className="flex items-center">
                  <div className="absolute left-1">
                    <img className="h-10 " src={logo} alt="Workflow" />
                  </div>

                  <div className="hidden md:block">
                    <div
                      className={
                        isAuth || FisAuth
                          ? 'flex  w-full items-center justify-end space-x-4 '
                          : ' flex w-full justify-center items-baseline space-x-4'
                      }
                    >
                      {isAuth ? (
                        <>
                          <input
                            type="text"
                            placeholder="Search"
                            className="lg:w-[70%] w-[50%]  py-3  h-10 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                          />
                          <Link to="/chat">
                            <div className="px-4 relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                              <BsFillChatLeftTextFill size={20} />
                              {count > 0 && (
                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                                  {count}
                                </div>
                              )}
                            </div>
                          </Link>
                          <button
                            id="dropdownUserAvatarButton"
                            data-dropdown-toggle="dropdownAvatar"
                            className="flex  text-sm bg-gray-800 rounded-full md:mr-0  focus:ring-4 focus:ring-gray-300 "
                            type="button"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-10  h-10 rounded-full"
                              src={`http://137.184.60.192:8000${profile_picture}`}
                              alt="ph"
                            />
                          </button>

                          <div
                            id="dropdownAvatar"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 "
                          >
                            <div className="px-4 py-3 text-sm text-gray-900 ">
                              <div>{username}</div>
                              <div className="font-medium truncate">
                                {email}
                              </div>
                            </div>
                            <ul
                              className="py-1  text-sm text-gray-700 "
                              aria-labelledby="dropdownUserAvatarButton"
                            >
                              <li>
                                <Link
                                  to="/services"
                                  className="hover:text-green-600 block px-4 py-2   "
                                >
                                  Discover Services
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/fprofile"
                                  className=" block hover:text-green-600 px-4 py-2 "
                                >
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/logout"
                                  className="block px-4 py-2 hover:text-green-600 "
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : FisAuth ? (
                        <>
                          <input
                            type="text"
                            placeholder="Search"
                            className="lg:w-[70%] w-[50%]  py-3  h-10 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                          />
                          <Link to="/fchat">
                            <div className="px-4 relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-purple-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                              <BsFillChatLeftTextFill size={20} />
                              {count > 0 && (
                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                                  {count}
                                </div>
                              )}
                            </div>
                          </Link>
                          <button
                            id="dropdownUserAvatarButton"
                            data-dropdown-toggle="dropdownAvatar"
                            className="flex  text-sm bg-gray-800 rounded-full md:mr-0  focus:ring-4 focus:ring-gray-300 "
                            type="button"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-10 h-10 rounded-full"
                              src={`http://137.184.60.192:8000${fprofile_picture}`}
                              alt="ph"
                            />
                          </button>

                          <div
                            id="dropdownAvatar"
                            className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-44 "
                          >
                            <div className="px-4 py-3 text-sm text-gray-900 ">
                              <div>{fusername}</div>
                              <div className="font-medium truncate">
                                {femail}
                              </div>
                            </div>
                            <ul
                              className="py-1  text-sm text-gray-700 "
                              aria-labelledby="dropdownUserAvatarButton"
                            >
                              <li>
                                <Link
                                  to="/fprofile"
                                  className=" block hover:text-green-600 px-4 py-2 "
                                >
                                  Profile
                                </Link>
                              </li>
                              <li>
                                <Link
                                  to="/flogout"
                                  className="block px-4 py-2 hover:text-green-600 "
                                >
                                  Logout
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center jusitify-end pl-4">
                          <Link to="/login">
                            <button
                              type="button"
                              className=" font-sans custom-line-button text-white primary text-sm font-medium"
                            >
                              Login
                            </button>
                          </Link>
                          <Link to="/select">
                            <button
                              type="button"
                              className=" font-sans button-new hover:text-white  text-sm font-medium"
                            >
                              Join
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex  md:hidden">
                  <button
                    onClick={() => {
                      return setIsOpen(!isOpen);
                    }}
                    type="button"
                    className="bg-purple-500 inline-flex items-center justify-center p-2 rounded-md text-black-400 hover:text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                      <svg
                        className="block h-6 w-6  "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentcolor"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
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
                </div>
              </div>
            </div>

            <Transition
              show={isOpen}
              enter="transition ease-out duration-100 transform"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-75 transform"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {isAuth ? (
                <div className="md:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1 text-center sm:px-3">
                    <ul
                      className="py-1  text-sm text-gray-700 "
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      <li>
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full mr-10  py-3  h-10 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                        />
                      </li>
                      <li className="mt-2">
                        <Link
                          to="/chat"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300  "
                        >
                          Inbox
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/services"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300  "
                        >
                          Discover Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/cprofile"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300 "
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/logout"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300  "
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : FisAuth ? (
                <div className="md:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1 text-center sm:px-3">
                    <ul
                      className="py-1  text-sm text-gray-700 "
                      aria-labelledby="dropdownUserAvatarButton"
                    >
                      <li>
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full mr-10  py-3  h-10 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                        />
                      </li>
                      <li className="mt-2">
                        <Link
                          to="/fchat"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300  "
                        >
                          Inbox
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/fprofile"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300 "
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/logout"
                          className="block hover:text-green-600 px-4 py-2 hover:bg-purple-300  "
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="md:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1 text-center sm:px-3">
                    <Link to="/login">
                      <a
                        href="#"
                        className="button-new text-white block px-3 py-2   text-base font-medium"
                      >
                        Login
                      </a>
                    </Link>

                    <Link to="register/">
                      <a
                        href="#"
                        className="custom-line-button block px-3 py-2 mt-2 text-base font-medium"
                      >
                        Join
                      </a>
                    </Link>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-full px-2 py-3  h-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                    />
                  </div>
                </div>
              )}
            </Transition>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
