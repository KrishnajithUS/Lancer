/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/img-redundant-alt */

import { AiFillEdit } from 'react-icons/ai';

import { useState, useEffect, React } from 'react';
import Skills from './Skills';

function Card({ data }) {
  console.log(data);
  const [check, setCheck] = useState(false);
  const handleClick = () => {
    setCheck(true);
  };

  return (
    <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
      <div className="pt-2 pl-3 ">
        <h6 className="text-lg  font-bold dark:text-black">{data}</h6>
      </div>
      <ul
        role="list"
        className="divide-y bg-white rounded-lg pl-10 pr-10 shadow-md divide-white dark:divide-gray-700 m-4 "
      >
        <li className="py-3 sm:py-4">
          <div className="flex justify-end items-center space-x-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                Django
              </p>
            </div>
            <div className="hover:cursor-pointer focus:outline-none focus:border-purple-500  focus:pointer-events-auto  inline-flex items-center text-base font-semibold text-purple-600">
              <button onClick={handleClick} type="button">
                <AiFillEdit />
              </button>

              {check && <Skills />}
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Card;
