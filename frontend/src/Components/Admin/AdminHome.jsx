/* eslint-disable quotes */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useState } from 'react';
import { Transition } from '@headlessui/react';
import { AiOutlineUsergroupDelete } from 'react-icons/ai';
import { BsFillHandbagFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tables from './Tables';
import Ftables from './Ftables';

function AdminHome() {
  const showstate = useSelector((state) => state.admin.initialdata);

  const [display, setDisplay] = useState(showstate);

  const [isOpen, setIsOpen] = useState(false);

  const handleTable = () => {
    setDisplay('usermanagement');
  };
  const handleTableL = () => {
    setDisplay('freelancer');
  };

  return (
    <div>
      <div className="grid grid-cols-5   md:grid-cols-4  ">
        <div className="md:col-span-1 col-span-full">
          <div className="flex flex-col  md:h-screen p-3  dark:bg-gray-900 dark:text-gray-100">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Dashboard</h2>
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
                      className="w-5 h-5  fill-current dark:text-gray-100"
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
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center py-4">
                  <button
                    type="submit"
                    className="p-2 focus:outline-none focus:ring"
                  >
                    <svg
                      fill="currentColor"
                      viewBox="0 0 512 512"
                      className="w-5 h-5 dark:text-gray-400"
                    >
                      <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z" />
                    </svg>
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  className="w-full py-2 pl-10 text-sm dark:border-transparent rounded-md focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900"
                />
              </div>
              <div className="flex-1 hidden md:block">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  <li className="rounded-sm">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current dark:text-gray-400"
                      >
                        <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z" />
                      </svg>
                      <span>Home</span>
                    </a>
                  </li>

                  <li className="rounded-sm">
                    <button
                      type="button"
                      onClick={handleTable}
                      className="transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center p-2 space-x-3 rounded-md"
                    >
                      <AiOutlineUsergroupDelete size={25} />
                      <span>User Management</span>
                    </button>
                  </li>
                  <li className="rounded-sm">
                    <button
                      onClick={handleTableL}
                      type="button"
                      className="transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BsFillHandbagFill size={25} />
                      <span>Freelancer Management</span>
                    </button>
                  </li>

                  <li className="rounded-sm">
                    <Link
                      to="/logout"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current dark:text-gray-400"
                      >
                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                        <rect width="32" height="64" x="256" y="232" />
                      </svg>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
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
              <div className="flex-1 ">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  <li className="rounded-sm">
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="md:w-5 h-5 w-2 h-2 fill-current dark:text-gray-400"
                      >
                        <path d="M469.666,216.45,271.078,33.749a34,34,0,0,0-47.062.98L41.373,217.373,32,226.745V496H208V328h96V496H480V225.958ZM248.038,56.771c.282,0,.108.061-.013.18C247.9,56.832,247.756,56.771,248.038,56.771ZM448,464H336V328a32,32,0,0,0-32-32H208a32,32,0,0,0-32,32V464H64V240L248.038,57.356c.013-.012.014-.023.024-.035L448,240Z" />
                      </svg>
                      <span>Home</span>
                    </a>
                  </li>

                  <li className="rounded-sm">
                    <button
                      type="button"
                      onClick={handleTable}
                      className="transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center p-2 space-x-3 rounded-md"
                    >
                      <AiOutlineUsergroupDelete size={25} />
                      <span>User Management</span>
                    </button>
                  </li>
                  <li className="rounded-sm">
                    <button
                      onClick={handleTableL}
                      type="button"
                      className="transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 flex items-center p-2 space-x-3 rounded-md"
                    >
                      <BsFillHandbagFill size={25} />
                      <span>Freelancer Management</span>
                    </button>
                  </li>

                  <li className="rounded-sm">
                    <Link
                      to="/logout"
                      className="flex items-center p-2 space-x-3 rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current dark:text-gray-400"
                      >
                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z" />
                        <rect width="32" height="64" x="256" y="232" />
                      </svg>
                      <span>Logout</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </Transition>
            <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
              <img
                src="https://source.unsplash.com/100x100/?portrait"
                alt=""
                className="w-12 h-12 rounded-lg dark:bg-gray-500"
              />
              <div>
                <h2 className="text-lg font-semibold">Admin</h2>
                <span className="flex items-center space-x-1" />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen md:col-span-3 col-span-full   dark:bg-gray-800">
          {display === 'usermanagement' ? (
            <Tables />
          ) : display === 'freelancer' ? (
            <Ftables />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AdminHome;
