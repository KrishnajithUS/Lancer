/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import profile1 from '../../../Assets/profile1.svg';

function ShwCaseCard() {
  return (
    <div className="mt-10 ml-4 mr-4 ">
      <div className="grid grid-cols-9 gap-4">
        <div className="md:col-span-2 col-span-full">
          <div className="w-full p-6 rounded  bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700">
            <div className="space-y-2 py-4 overflow-y-auto  ">
              <h2 className="text-md font-bold tracking-widest uppercase dark:text-black">
                Filter
              </h2>
              <ul className="">
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white  dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Web Design</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Web Development</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="md:col-span-4 col-start-2 col-end-9 border-gray-300">
          <div className="block md:max-w-sm w-full  p-2 bg-white  bg-gray-50 border border-gray-100  rounded-lg shadow-lg shadow-gray-700">
            <div className="h-60 w-full rounded-lg bg-white border border-2">Post image</div>
            <div className="flex flex-col ">
              <div className="flex  mt-2 items-center  space-x-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={profile1}
                    alt="img"
                  />
                </div>
                <div className="flex-1  min-w-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                      Neil Sims
                    </p>
                  </div>
                </div>
                <div className="text-black">
                  <div>
                    <h3>Starting At</h3>
                  </div>
                  <div className="text-center text-bold">
                    <span>700 $</span>
                  </div>
                </div>
              </div>
              <div className="pt-4 pl-2 pb-2 hover:cursor-pointer hover:text-green-900 text-black ">
                <h1>I will design ...</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShwCaseCard;
