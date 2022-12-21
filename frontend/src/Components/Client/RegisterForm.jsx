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
          navigate('/login');
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
                    className="border-slate-800 transition focus:z-10 focus:border-blue-600 focus:ring-blue-600 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                    className="border-slate-800 transition focus:z-10 focus:border-blue-600 focus:ring-blue-600 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                    className="border-slate-800 transition focus:z-10 focus:border-blue-600 focus:ring-blue-600 w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                    className="border-slate-800 transition focus:z-10 focus:border-blue-600 focus:ring-blue-600 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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
                    className="border-slate-800 transition focus:z-10 focus:border-blue-600 focus:ring-blue-600 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
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

                <div className="mb-6 text-center">
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
