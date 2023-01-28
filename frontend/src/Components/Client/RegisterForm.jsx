/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-template */
/* eslint-disable quotes */
/* eslint-disable object-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../Axios/axiosPrivate';
import Modals from '../Constants/Modals';
import RegisterImage from '../../Assets/register.png';
import { signUpSchema } from '../../schemas/index';

function Register() {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  };
  const {
    values,

    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,

    onSubmit: async (values, actions) => {
      console.log(values.first_name);
      try {
        const response = await axiosInstance.post(`/register/`, {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          is_freelancer: false,
        });
        if (response.status === 201) {
          console.log(response.data.id);
          navigate(`/verifyotp/${response.data.id}`);
        } else {
          setErrorMessage('A user with same email already exists');
        }
      } catch (error) {
        // eslint-disable-next-line no-alert
        setErrorMessage('A user with same email already exists');
      }
      actions.resetForm();
    },
  });
  console.log(errorMessage);
  return (
    <section>
      <div className="container mx-auto">
        {errorMessage && <Modals setErrorMessage={setErrorMessage} />}
        <div className="flex justify-center px-6 my-12">
          {/* Row */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <img
              src={RegisterImage}
              alt="img"
              className="w-full h-auto-[20px] bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            />

            {/* Col */}
            <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center">Sign Up As Client</h3>
              <form
                onSubmit={handleSubmit}
                className="md:px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="First Name"
                  >
                    First Name
                  </label>
                  <input
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    id="Last Name"
                    name="first_name"
                    type="text"
                    placeholder="first Name"
                    autoComplete="off"
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
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Last Name"
                  >
                    Last Name
                  </label>
                  <input
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    id="Last Name"
                    name="last_name"
                    type="text"
                    placeholder="Last Name"
                    autoComplete="off"
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
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <input
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    id="Email"
                    type="text"
                    name="email"
                    placeholder="email"
                    autoComplete="off"
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
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.password && touched.password ? (
                    <p className="form-error text-red-600">{errors.password}</p>
                  ) : null}
                </div>
                <div>
                  <label
                    className="block mb-2 text-sm font-bold text-gray-700"
                    htmlFor="confirm_password"
                  >
                    Confirm Password
                  </label>
                  <input
                    className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    placeholder="******************"
                    autoComplete="off"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.confirm_password && touched.confirm_password ? (
                    <p className="form-error text-red-600">
                      {errors.confirm_password}
                    </p>
                  ) : null}
                </div>

                <div className="mb-6 mt-4 text-center">
                  <button
                    type="submit"
                    className="w-full md:w-[80%] md:ml-4 px-4 py-2 font-bold text-white button-new rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
                  >
                    Sign In
                  </button>
                </div>
                <hr className="mb-6 border-t" />
                <div className="text-center">
                  <button
                    type="button"
                    className=" inline-block text-sm text-blue-500 align-baseline hover:text-purple-800"
                  >
                    Create an Account!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
