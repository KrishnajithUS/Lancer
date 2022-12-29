/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable prettier/prettier */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Personal() {
  console.log(useSelector((state) => state));
  const FirstName = useSelector((state) =>
    state.user.userDetails
      ? state.freelancer.FreelancerDetails.first_name
      : null
  );
  console.log(useSelector((state) => state));
  const userName = useSelector((state) =>
    state.user.userDetails ? state.freelancer.FreelancerDetails.username : null
  );
  console.log(useSelector((state) => state));
  const email = useSelector((state) =>
    state.user.userDetails ? state.freelancer.FreelancerDetails.email : null
  );
  console.log(useSelector((state) => state));
  const lastName = useSelector((state) =>
    state.user.userDetails ? state.freelancer.FreelancerDetails.last_name : null
  );
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
                FirstName
              </label>
              <input
                type="text"
                id="first_name"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder={FirstName}
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
                placeholder={lastName}
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
                name="title"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder=""
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="social_media"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Social Media links
              </label>
              <input
                type="text"
                name="social_media"
                className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder=""
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
              name="email"
              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder={email}
              required=""
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="bio"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Update Your Bio
            </label>
            <input
              type="text"
              name="bio"
              className=" focus:border-purple-600 focus:outline-none block w-full p-4 text-white-900 border border-slate-500 rounded-lg bg-white sm:text-md  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Old Password
            </label>
            <input
              type="password"
              name="password"
              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder="Old Password"
              required=""
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              New Password
            </label>
            <input
              type="password"
              name="new_password"
              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              placeholder="New Password"
              required=""
            />
          </div>
          <div className="mb-6  m-4">
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
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
