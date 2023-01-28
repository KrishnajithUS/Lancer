/* eslint-disable indent */
/* eslint-disable function-paren-newline */
/* eslint-disable no-confusing-arrow */
/* eslint-disable camelcase */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';

import { cprofileSchema } from '../../schemas';
import useAxios from '../../Axios/useAxios';
import { userDetails } from '../../Redux/reducer';
import Alert from '../Alerts/Alert';

function Cprofile() {
  const dispatch = useDispatch();
  const mediaBase = 'http://localhost:8000';
  const id = useSelector((state) => state.user.user.id);
  const [message, setMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const messageAlert = () => {
    setMessage(true);
  };
  setTimeout(() => {
    setMessage(false);
  }, 8000);
  const api = useAxios();
  const data = async () => {
    try {
      const response = await api.post(`/cprofileData/`, {
        id,
      });
      console.log('response', response.data);

      dispatch(userDetails(response.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
  }, [dispatch, api]);
  // handling image update
  const username = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.username : null
  );
  const first_name = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.first_name : null
  );
  const profile_picture = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.profile_picture : null
  );

  const last_name = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.last_name : null
  );

  const email = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.email : null
  );

  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
  };

  const {
    values,
    setFieldValue,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: cprofileSchema,
    // eslint-disable-next-line no-unused-vars
    onSubmit: async (values, actions) => {
      try {
        const formData = new FormData();
        if (values.file) {
          formData.append('profile_picture', values.file);
          formData.append('id', id);

          console.log(formData);
          const Res = await api.patch(`/cupdate/`, formData);
          if (Res.status === 201) {
            console.log('block 3');
            setShowModal(false);

            messageAlert();
          }
        }

        const response = await api.put(`/cupdate/`, {
          id,
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          new_password: values.new_password,
          confirm_new_password: values.confirm_new_password,
        });
        setShowModal(false);

        dispatch(userDetails(response.data));

        if (response.status === 201) {
          console.log('block 1');
          messageAlert();
        }

        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    },
  });
  console.log(values);
  console.log(errors);
  return (
    <div className="w-full h-screen">
      {message && <Alert />}
      <div className="flex  justify-center items-center  h-48 mx-4 mt-2  bg-zinc-200 rounded-lg ">
        <div className="rounded-full">
          <img
            src={`${mediaBase}${profile_picture}`}
            className="rounded-full w-40 h-40"
            alt="Avatar"
          />
        </div>
      </div>
      <div className="w-full flex justify-center md:h-60 h-96 ">
        <div className="w-3/4  shadow-2xl">
          <div className="flex justify-center  md:pl-0 md:justify-center pt-4">
            <h1 className="md:mr-0  text-2xl">Personal Details</h1>
          </div>
          <div className="flex justify-center ">
            <div className="grid gap-6 grid-cols-6 justify-center items-center pt-4   md:grid-cols-2 grid-col-1">
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Username:</span>
                <span className="pl-3">{username}</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>First Name:</span>
                <span className="col-start-1 col-end-7 pl-2">{first_name}</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Last Name:</span>
                <span className="pl-2">{last_name}</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>Email:</span>
                <span className="pl-2">{email}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="transition transform duration-150 ease-out col-start-1 col-end-7 mx-4 md:col-span-6 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
              >
                Update Profile
              </button>
              {showModal ? (
                <div
                  tabIndex={-1}
                  className=" fixed flex justify-center items-center top-0 pt-28 md:pt-4 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-screen md:h-full"
                >
                  <div className="shadow-2xl md:pt-0  mt-4 md:mt-0 md:m-4 bg-white border mb-4  md:h-[100%] border-gray-500 relative  rounded-lg">
                    <div className="relative   m-4 md:m-4 lg:10 ">
                      <button
                        onClick={() => setShowModal(false)}
                        type="button"
                        className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
                      <form onSubmit={handleSubmit} className="mb-4">
                        <p className="md:pt-2 pl-3  ">
                          <h6 className="text-lg  font-bold dark:text-black">
                            Edit
                          </h6>
                        </p>
                        <div className="grid gap-4 m-4 mb-6 grid-cols-2">
                          <div>
                            <label className="block text-black text-sm font-bold mb-1">
                              First Name
                            </label>
                            <input
                              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                              name="first_name"
                              type="text"
                              placeholder={first_name}
                              value={values.first_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {errors.first_name && touched.first_name ? (
                              <p className="form-error text-red-600">
                                {errors.first_name}
                              </p>
                            ) : null}
                          </div>
                          <div>
                            <label className="block text-black text-sm font-bold mb-1">
                              Last Name
                            </label>
                            <input
                              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                              name="last_name"
                              type="text"
                              placeholder={last_name}
                              value={values.last_name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            {errors.last_name && touched.last_name ? (
                              <p className="form-error text-red-600">
                                {errors.last_name}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <div className="grid gap-4 m-4 mb-6 md:grid-cols-2">
                          <div>
                            <label className="block text-black text-sm font-bold mb-1">
                              Username
                            </label>
                            <input
                              className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                              name="username"
                              type="text"
                              placeholder={username}
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />

                            {errors.username && touched.username ? (
                              <p className="form-error text-red-600">
                                {errors.username}
                              </p>
                            ) : null}
                          </div>

                          <div>
                            <label className="block text-black text-sm font-bold ">
                              Image
                            </label>
                            <input
                              accept="image/*"
                              multiple={false}
                              className="

                              w-full
                              px-3 py-1
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                              type="file"
                              name="file"
                              id="file"
                              onChange={(event) => {
                                handleChange(event);
                                setFieldValue(
                                  'file',
                                  event.currentTarget.files[0]
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div className="m-4">
                          <label className="block text-black text-sm font-bold mb-1">
                            Email
                          </label>
                          <input
                            className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                            name="email"
                            type="text"
                            placeholder={email}
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.email && touched.email ? (
                            <p className="form-error text-red-600">
                              {errors.email}
                            </p>
                          ) : null}
                        </div>
                        <div className="m-4">
                          <label className="block text-black text-sm font-bold mb-1">
                            Old Password
                          </label>
                          <input
                            className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                            name="password"
                            type="password"
                            placeholder="old password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.password && touched.password ? (
                            <p className="form-error text-red-600">
                              {errors.password}
                            </p>
                          ) : null}
                        </div>
                        <div className="m-4">
                          <label className="block text-black text-sm font-bold mb-1">
                            New Password
                          </label>
                          <input
                            className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                            name="new_password"
                            type="new_password"
                            placeholder="New password"
                            value={values.new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.new_password && touched.new_password ? (
                            <p className="form-error text-red-600">
                              {errors.new_password}
                            </p>
                          ) : null}
                        </div>
                        <div className="m-4">
                          <label className="block text-black text-sm font-bold mb-1">
                            Confirm New Password
                          </label>
                          <input
                            className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                            id="confirm_new_password"
                            name="confirm_new_password"
                            type="confirm_new_password"
                            placeholder="Confirm New password"
                            value={values.confirm_new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.confirm_new_password
                          && touched.confirm_new_password ? (
                            <p className="form-error text-red-600">
                              {errors.confirm_new_password}
                            </p>
                          ) : null}
                        </div>
                        <div className="m-4 pb-4 flex justify-center ">
                          <button
                            className="   text-black bg-purple-700 hover:bg-black hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-black dark:focus:ring-purple-800"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cprofile;
