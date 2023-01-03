/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function Education() {
  return (
    <div
      id="authentication-modal"
      tabIndex={-1}
      aria-hidden="true"
      className="fixed md:flex justify-center items-center top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
    >
      <div className="bg-zinc-200 order-5 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="relative order-2 rounded-lg  col-span-3 md:col-start-2 col-end-4">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-toggle="authentication-modal"
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
          <form>
            <div className="pt-2 pl-3 ">
              <h6 className="text-lg  font-bold dark:text-black">Education</h6>
            </div>

            <div className="mb-6  m-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                University
              </label>
              <input
                type="text"
                id="email"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="Kerala University"
                required=""
              />
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Degree
              </label>
              <input
                type="text"
                id="email"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="Bsc"
                required=""
              />
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Field of Study
              </label>
              <input
                type="text"
                id="email"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="physics"
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
  );
}

export default Education;
