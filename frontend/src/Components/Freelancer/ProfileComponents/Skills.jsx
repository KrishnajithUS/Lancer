/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import useAxios from '../../../Axios/useAxios';
import { cprofileSchema } from '../../../schemas';
import { modalStatus } from '../../../Redux/Freducer';

function Skills({ addskill, skills }) {
  const api = useAxios();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const check = useSelector((state) => state.freelancer.modelStatus);
  const singleData = useSelector((state) => state.freelancer.skills);
  console.log(singleData);
  const id = singleData.id ? singleData.id : null;

  const handleChangeL = () => {
    dispatch(modalStatus('hidemodal'));
  };

  const initialValues = {
    skills: '',
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
    validationScheme: cprofileSchema,
    onSubmit: async (values, actions) => {
      console.log('values', values);
      if (addskill) {
        try {
          const Response = await api.post(`skills/`, {
            skills: values.skills,
            id,
          });
          skills();
        } catch (err) {
          alert(err);
        }
      } else {
        try {
          const Response = await api.put(`skills/`, {
            skills: values.skills,
            id,
          });
          skills();
        } catch (err) {
          alert(err);
        }
      }

      handleChangeL();
    },
  });
  console.log(values);
  console.log(errors);
  return (
    <>
      {check === 'showmodal' ? (
        <div
          tabIndex={-1}
          className="fixed md:flex justify-center items-center top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        >
          <div className="bg-zinc-200 w-[50%] h-[50%] relative  rounded-lg">
            <div className="relative">
              <button
                onClick={handleChangeL}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="pt-2 pl-3 ">
                  <h6 className="text-lg text-black  font-bold dark:text-black">
                    Skills
                  </h6>
                </div>

                <div className="mb-6  m-4">
                  <label
                    htmlFor="email"
                    className="block text-black mb-2 text-sm font-medium text-white-900 dark:text-black"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="skills"
                    className=" focus:border-purple-600 focus:outline-none bg-white text-white-900 text-sm rounded-lg block w-full p-2.5   dark:placeholder-slate-400 dark:text-black"
                    placeholder={
                      singleData.skills ? singleData.skills : 'enter a skill'
                    }
                    required=""
                    value={values.skills}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.skills && touched.skills ? (
                    <p className="form-error text-red-600">{errors.skills}</p>
                  ) : null}
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
      ) : null}
    </>
  );
}

export default Skills;
