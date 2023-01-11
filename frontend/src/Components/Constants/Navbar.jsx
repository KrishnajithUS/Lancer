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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@headlessui/react';
import { useSelector } from 'react-redux';
import logo from '../../Assets/logo.png';
// eslint-disable-next-line react/function-component-definition
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useSelector((state) => state.user.user.isLoggedIn);
  const FisAuth = useSelector(
    (state) => state.freelancer.Freelancer.isLoggedIn
  );
  const username = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.username : null
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
                        !isAuth
                          ? 'ml-10 flex w-full  items-baseline space-x-4'
                          : !FisAuth
                          ? 'flex  w-full items-center justify-end space-x-4 '
                          : ' flex w-full  items-baseline space-x-4'
                      }
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        className="lg:w-full w-[60%]  py-3  h-10 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                      />
                      {isAuth ? (
                        <>
                          <button
                            id="dropdownUserAvatarButton"
                            data-dropdown-toggle="dropdownAvatar"
                            className="flex  text-sm bg-gray-800 rounded-full md:mr-0  focus:ring-4 focus:ring-gray-300 "
                            type="button"
                          >
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-10 h-10 rounded-full"
                              src={`http://localhost:8000${profile_picture}`}
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
                                <Link to="/cprofile" className=" block hover:text-green-600 px-4 py-2 ">
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
                        <Link to="/logout">
                          <div className="mr-4">
                            <button
                              type="button"
                              className=" rounded-full font-sans button-new hover:text-white px-3 py-2  text-sm font-medium"
                            >
                              LogOut
                            </button>
                          </div>
                        </Link>
                      ) : (
                        <>
                          <Link to="/login">
                            <a
                              href="#"
                              className=" font-sans custom-line-button text-white px-1 py-2 primary text-sm font-medium"
                            >
                              Login
                            </a>
                          </Link>
                          <Link to="/select">
                            <a
                              href="#"
                              className="font-sans button-new hover:text-white px-3 py-2  text-sm font-medium"
                            >
                              Join
                            </a>
                          </Link>
                        </>
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
                    <Link to="/logOut">
                      <button
                        type="button"
                        className=" rounded-full button-new text-white block px-3 py-2   text-base font-medium"
                      >
                        LogOut
                      </button>
                    </Link>
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
