/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function Personal() {
  return (
    <>
      {' '}
      <div className=" bg-zinc-200 order-2 rounded-lg  col-span-3 md:col-start-2 col-end-4">
        <form>
          <div className="pt-2 pl-3 ">
            <h6 className="text-lg  font-bold dark:text-black">
              Personal Informations
            </h6>
          </div>

          <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-dark"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="John"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Last name
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

          <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-dark"
              >
                Title(Related to Your service)
              </label>
              <input
                type="text"
                id="first_name"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="John"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Social Media links
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
          <div className="mb-6  m-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder="john.doe@company.com"
              required=""
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Update Your Bio
            </label>
            <input
              type="text"
              id="large-input"
              className=" focus:border-purple-600 focus:outline-none block w-full p-4 text-white-900 border border-slate-500 rounded-lg bg-white sm:text-md  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Password
            </label>
            <input
              type="email"
              id="email"
              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder="Password"
              required=""
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Confirm Password
            </label>
            <input
              type="email"
              id="email"
              className=" focus:border-purple-600 focus:outline-none  bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder="confirm password"
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
    </>
  );
}

export default Personal;
