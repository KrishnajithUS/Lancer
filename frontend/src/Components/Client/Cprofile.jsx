/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable no-confusing-arrow */
/* eslint-disable comma-dangle */
/* eslint-disable no-debugger */
/* eslint-disable camelcase */
/* eslint-disable operator-linebreak */
/* eslint-disable object-curly-newline */
/* eslint-disable quotes */
/* eslint-disable no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { AiFillCloseSquare } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Constants/Navbar';
import { cprofileSchema } from '../../schemas';
import useAxios from '../../Axios/useAxios';
import { userDetails } from '../../Redux/reducer';

function Cprofile() {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.user.id);

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
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);

  const first_name = useSelector((state) =>
    state.user.userDetails ? state.user.userDetails.first_name : null
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
    email: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
  };
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: cprofileSchema,
      // eslint-disable-next-line no-unused-vars
      onSubmit: async (values, actions) => {
        try {
          const response = await api.put(`/cupdate/`, {
            id,
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            new_password: values.new_password,
            confirm_new_password: values.confirm_new_password,
          });
          dispatch(userDetails(response.data));
          console.log(response.data);
        } catch (err) {
          console.log(err);
        }
      },
    });

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex  justify-center items-center  h-48 mx-4 mt-2 bg-black">
        <div className="rounded-full">
          <img
            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
            className="rounded-full w-24 h-24"
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
                <span className="pl-3">krishnajith</span>
              </div>
              <div className="col-start-1 col-end-7 md:col-span-3">
                <span>first_name:</span>
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
                <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto md:mr-[120px] fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="relative w-auto my-6 mt-20 mx-auto max-w-5xlxl">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full md:w-[150%]  bg-white outline-none focus:outline-none">
                      <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font=semibold">Edit</h3>
                        <button
                          type="button"
                          className="bg-transparent border-0 text-black float-right"
                          onClick={() => setShowModal(false)}
                        >
                          <span>
                            <AiFillCloseSquare size={30} />
                          </span>
                        </button>
                      </div>
                      <div className="relative  p-6 flex-auto">
                        <form
                          onSubmit={handleSubmit}
                          className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full"
                        >
                          <label className="block text-black text-sm font-bold mb-1">
                            First Name
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            Last Name
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            Image
                          </label>
                          <input
                            className="form-control

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                            type="file"
                            id="formFile"
                          />
                          <label className="block text-black text-sm font-bold mb-1">
                            Email
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="email"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            Old Password
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="password"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            New Password
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="new_password"
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
                          <label className="block text-black text-sm font-bold mb-1">
                            Confirm New Password
                          </label>
                          <input
                            className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                            id="confirm_new_password"
                            name="confirm_new_password"
                            type="confirm_new_password"
                            placeholder="Confirm New password"
                            value={values.confirm_new_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.confirm_new_password &&
                          touched.confirm_new_password ? (
                            <p className="form-error text-red-600">
                              {errors.confirm_new_password}
                            </p>
                            ) : null}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="text-white bg-purple-500 hover:bg-purple-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                              type="submit"
                            >
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
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
