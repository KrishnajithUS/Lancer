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

  return (
    <div className="sticky top-0 z-50  shadow-sm shadow-purple-400">
      <header>
        <div className="">
          <nav className="bg-white font-sans  ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
              <div className="flex items-center justify-end h-16 ">
                <div className="flex items-center">
                  <div className="absolute left-1">
                    <img className="h-10 " src={logo} alt="Workflow" />
                  </div>

                  <div className="hidden md:block">
                    <div
                      className={
                        isAuth
                          ? 'ml-10 flex w-full  items-baseline space-x-4'
                          : ' flex w-full  items-baseline space-x-4'
                      }
                    >
                      <input
                        type="text"
                        placeholder="Search"
                        className="lg:w-full w-[60%]  py-3  h-10 pl-10  text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-purple-600"
                      />
                      {!isAuth ? (
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
                      ) : (
                        <Link to="/logout">
                          <div className="mr-4">
                            <a
                              href="#"
                              className="font-sans button-new hover:text-white px-3 py-2  text-sm font-medium"
                            >
                              LogOut
                            </a>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
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
              {!isAuth ? (
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
              ) : (
                <div className="md:hidden" id="mobile-menu">
                  <div className="px-2 pt-2 pb-3 space-y-1 text-center sm:px-3">
                    <Link to="/logOut">
                      <a
                        href="#"
                        className="button-new text-white block px-3 py-2   text-base font-medium"
                      >
                        LogOut
                      </a>
                    </Link>
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
