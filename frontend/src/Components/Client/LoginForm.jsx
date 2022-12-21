/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable import/named */
/* eslint-disable indent */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginImage from '../../Assets/login9.png';
import { loginSchema } from '../../schemas/index';
import axiosInstance from '../../Axios/axiosPrivate';
import { userData, setToken } from '../../Redux/reducer';

function LoginForm() {
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: '',
    password: '',
  };
  // eslint-disable-next-line operator-linebreak
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, actions) => {
        try {
          const response = await axiosInstance.post(`/login/`, {
            email: values.email,
            password: values.password,
          });
          console.log('data', response.data);
          if (response.status === 200 && response.data.data.is_freelancer) {
            console.log(
              'response comes here first',
              response.data.data.is_freelancer
            );
            dispatch(userData(response.data));
            dispatch(setToken(response.data));
            navigate('/fprofile');
          } else if (response.status === 200) {
            console.log(
              'response comes here',
              response.data.data.is_freelancer
            );
            console.log('the data', response.data);
            dispatch(userData(response.data));
            dispatch(setToken(response.data));

            navigate('/cprofile');
          } else {
            setErrorMessage('Invalid Credentials');
          }
        } catch (err) {
          if (err.response) {
            setErrorMessage('Invalid Credentials');
            console.log('first check', err.response);
          } else if (err.request) {
            console.log('seconcd check', err.request);
          } else {
            console.log('anything else');
          }
        }
        actions.resetForm();
      },
    });
  console.log(values);
  console.log(errors);
  return (
    <section>
      {/* component */}
      {/* Container */}

      <div className="container mx-auto">
        {errorMessage && (
          <div
            className="bg-red-100 border mt-4 border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">{errorMessage}</strong>

            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                onClick={() => {
                  setErrorMessage('');
                }}
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        )}
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <img
              src={LoginImage}
              alt="img"
              className="w-full h-auto-[20px] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            />

            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
              <form
                onSubmit={handleSubmit}
                className="md:px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <input
                    className="border-slate-800 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p className="form-error text-red-600">{errors.email}</p>
                  ) : null}
                </div>
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="border-slate-800 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="******************"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.password && touched.password ? (
                    <p className="form-error text-red-600">{errors.password}</p>
                  ) : null}
                </div>

                <div className="mb-6 text-center">
                  <button
                    className="w-full md:w-[80%] md:pl-2 px-4 py-2 font-bold text-white button-new rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <button
                    type="button"
                    className="border-purple-900 inline-block text-sm text-blue-500 align-baseline hover:text-purple-800"
                  >
                    Create an Account!
                  </button>
                </div>
                <div className="text-center">
                  <a
                    className="inline-block text-sm text-blue-500 align-baseline hover:text-purple-800"
                    href="./forgot-password.html"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
