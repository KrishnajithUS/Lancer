/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function Experience() {
  return (
    <>
      {' '}
      <div className="bg-zinc-200 order-4 rounded-lg  col-span-3  md:col-start-2 col-end-4">
        <div className="border-2 rounded-lg  col-span-3 md:col-start-2 col-end-4">
          <form>
            <p className="pt-2 pl-3 ">
              <h6 className="text-lg  font-bold dark:text-black">
                Most Recent Experience
              </h6>
            </p>
            <div className="m-4">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Company
              </label>
              <input
                type="text"
                id="first_name"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="Company"
                required=""
              />
            </div>

            <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Country
                </label>
                <select
                  id="countries"
                  className=" text-gray-900     focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                >
                  <option selected>Choose a country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Place
                </label>
                <input
                  type="text"
                  id="last_name"
                  className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder="Doe"
                  required=""
                />
              </div>
            </div>
            <div className="m-4">
              <div>
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="disabled-checkbox"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  I am Currently Working on this role
                </label>
              </div>
            </div>
            <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  No of Years
                </label>
                <select
                  id="countries"
                  className=" text-gray-900     focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                >
                  <option selected>Years</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div>
            </div>
            <div className="m-4">
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Description
              </label>
              <textarea
                type="text"
                id="first_name"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="Company"
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
    </>
  );
}

export default Experience;
