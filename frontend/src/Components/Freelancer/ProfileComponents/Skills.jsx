/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modalStatus } from '../../../Redux/Freducer';

function Skills() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [check, setCheck] = useState(
    useSelector((state) => state.freelancer.modelStatus),
  );

  const handleChange = () => {
    setCheck(false);
    dispatch(modalStatus(false));
    navigate(0);
  };

  return (
    <>
      {check ? (
        <div
          tabIndex={-1}
          className="fixed md:flex justify-center items-center top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        >
          <div className="bg-zinc-200 w-[50%] h-[50%] relative  rounded-lg">
            <div className="relative">
              <button
                onClick={handleChange}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <form className="w-full">
                <div className="pt-2 pl-3 ">
                  <h6 className="text-lg text-black  font-bold dark:text-black">
                    Skills
                  </h6>
                </div>

                <div className="mb-6  m-4">
                  <label
                    htmlFor="email"
                    className="block text-black mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="email"
                    className=" focus:border-purple-600 focus:outline-none bg-white text-white-900 text-sm rounded-lg block w-full p-2.5   dark:placeholder-slate-400 dark:text-black"
                    placeholder="django Developer"
                    required=""
                  />
                </div>

                <div className="m-4 ">
                  <button
                    type="submit"
                    className="   text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Skills;
