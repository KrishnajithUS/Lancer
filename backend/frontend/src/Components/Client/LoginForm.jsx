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
import { FData, FsetToken } from '../../Redux/Freducer';
import LoginImage from '../../Assets/login9.png';
import Modals from '../Constants/Modals';
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

          if (response.status === 200 && response.data.is_freelancer) {
            dispatch(FData(response.data));
            dispatch(FsetToken(response.data));

            navigate('/fprofile');
          } else if (response.status === 200) {
            dispatch(userData(response.data));
            dispatch(setToken(response.data));

            navigate('/cprofile');
          } else {
            setErrorMessage('Invalid Credentials');
          }
        } catch (err) {
          console.log(err.response.data)
          setErrorMessage(err.response.data.msg)
        }
        actions.resetForm();
      },
    });

  return (
    <section>
      {/* component */}
      {/* Container */}

      <div className="container mx-auto ">
        {errorMessage && (
          <Modals
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
          />
        )}
        <div className="flex justify-center px-6  my-12">
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
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
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
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
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
