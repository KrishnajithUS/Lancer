/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useMemo, useEffect } from 'react';
import countryList from 'react-select-country-list';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { ExperienceSchema } from '../../../schemas';
import useAxios from '../../../Axios/useAxios';

function Experience({ addnew, setExpState, expState, experience }) {
  const addnewN = Boolean(addnew);
  const singleData = useSelector((state) => state.freelancer.skills);
  const [check, setCheck] = useState(Boolean(singleData.is_currently_working));
  const [bcountry, setCountry] = useState('');
  const arr = Array.from({ length: 100 }, (_, index) => index + 1);
  const options = arr;
  const optionsnew = useMemo(() => countryList().getLabels(), []);
  const changeHandler = (e) => {
    setCountry(e.target.value);
  };

  const [select, setSelect] = useState(null);
  const handleChangeL = (e) => {
    const { value, checked } = e.target;

    setCheck(!check);
  };
  const handleChangeL2 = () => {
    setExpState('');
  };
  const handleChangeLL = (e) => {
    setSelect(e.target.value);
  };
  const api = useAxios();
  const handleDelete = async () => {
    try {
      await api.post(`/eupdate/`, {
        id: singleData.id ? singleData.id : '',
        is_delete: true,
      });
      experience();
      handleChangeL2();
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    company: '',
    bcountry: '',
    place: '',
    no_of_years: '',
    description: '',
  };
  console.log('addnewN', addnewN);
  const {
    values,

    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues,
    validationSchema: ExperienceSchema,

    onSubmit: async (values, actions) => {
      if (addnewN) {
        try {
          console.log(check);
          await api.post(`/eupdate/`, {
            company: values.company,
            country: bcountry,
            description: values.description,
            place: values.place,
            no_of_years: select,
            is_currently_working: check,
          });
          experience();
        } catch (er) {
          console.log(er);
        }
      } else {
        try {
          await api.put(`/eupdate/`, {
            id: singleData.id,
            company: values.company,
            country: bcountry,
            description: values.description,
            place: values.place,
            no_of_years: values.years,
            is_currently_working: check,
          });
          experience();
        } catch (er) {
          console.log(er);
        }
      }
      handleChangeL2();

      actions.resetForm();
    },
  });
  console.log(values);
  console.log(errors);
  if (expState === 'showexp' || expState === 'showexp2') {
    return (
      <>
        <div
          tabIndex={-1}
          className=" fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full"
        >
          <div className="shadow-2xl bg-white shadow-lg border  md:h-[100%] border-gray-500 relative  rounded-lg">
            <div className="relative m-4 ">
              <button
                onClick={handleChangeL2}
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

              <form onSubmit={handleSubmit}>
                <p className="md:pt-2 pl-3  ">
                  <h6 className="text-lg  font-bold dark:text-black">
                    Add Experience
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
                    name="company"
                    className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    placeholder={addnewN ? '' : singleData.company}
                    required=""
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.company && touched.company ? (
                    <p className="form-error text-red-600">{errors.company}</p>
                  ) : null}
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
                      value={addnewN ? '' : singleData.no_of_years}
                      onChange={handleChangeLL}
                      className=" text-gray-900     focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    >
                      {options.map((option, index) => (
                        <option value={option} key={index}>
                          {option}
                                                  
                        </option>
                      ))}
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
                      name="place"
                      className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                      placeholder={addnewN ? '' : singleData.place || null}
                      value={values.place}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />

                    {errors.place && touched.place ? (
                      <p className="form-error text-red-600">{errors.place}</p>
                    ) : null}
                  </div>
                </div>
                <div className="m-4">
                  <div>
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={check}
                      onChange={handleChangeL}
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
                      Select Country
                    </label>
                    <select
                      value={addnewN ? '' : bcountry || singleData.country}
                      id="countries"
                      onChange={changeHandler}
                      className=" text-gray-900      focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    >
                      {optionsnew.map((option, index) => (
                        <>
                          <option value="none" selected disabled hidden>
                            Select a country
                          </option>
                          <option value={option} key={index}>
                            {option}
                          </option>
                        </>
                      ))}
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
                    name="description"
                    className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                    placeholder={addnewN ? '' : singleData.description || ''}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  {errors.description && touched.description ? (
                    <p className="form-error text-red-600">
                      {errors.description}
                    </p>
                  ) : null}
                </div>

                <div className="m-4 ">
                  <button
                    type="submit"
                    className="   text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Save
                  </button>
                  {addnewN ? (
                    ''
                  ) : (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="md:ml-2 mt-2   text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:rinred-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red  "
                    >
                      Delete
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Experience;
