/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { EducationSchema } from '../../../schemas';
import useAxios from '../../../Axios/useAxios';

function Education({ addnew, eduState, setEduState, education }) {
  const addnewN = Boolean(addnew);
  const singleData = useSelector((state) => state.freelancer.skills);
  console.log('single data in education', singleData);
  const handleChangeL2 = () => {
    setEduState('');
  };
  const api = useAxios();
  const handleDelete = async () => {
    try {
      await api.post(`/edupdate/`, {
        id: singleData.id ? singleData.id : '',
        is_delete: true,
      });
      education();
      handleChangeL2();
    } catch (err) {
      console.log(err);
    }
  };
  const initialValues = {
    university: '',
    degree: '',
    field_of_study: '',
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
    validationSchema: EducationSchema,

    onSubmit: async (values, actions) => {
      if (addnewN) {
        try {
          await api.post(`/edupdate/`, {
            university: values.university,
            degree: values.degree,
            field_of_study: values.field_of_study,
          });
          education();
        } catch (er) {
          console.log(er);
        }
      } else {
        try {
          await api.put(`/edupdate/`, {
            id: singleData.id ? singleData.id : '',
            university: values.university,
            degree: values.degree,
            field_of_study: values.field_of_study,
          });
          education();
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
  if (eduState === 'showedu' || eduState === 'showedu2') {
    return (
      <div
        tabIndex={-1}
        className=" fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full"
      >
        <div className="shadow-2xl bg-white  border md:w-[60%]  md:h-[80%] border-gray-500 relative  rounded-lg">
          <div className="relative m-8 lg:10 ">
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
              <div className="pt-2 pl-3 ">
                <h6 className="text-lg  font-bold dark:text-black">
                  Education
                </h6>
              </div>

              <div className="mb-6  m-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  University
                </label>
                <input
                  type="text"
                  name="university"
                  className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={addnewN ? '' : singleData.university}
                  required=""
                  value={values.university}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.university && touched.university ? (
                  <p className="form-error text-red-600">{errors.university}</p>
                ) : null}
              </div>
              <div className="mb-6  m-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Degree
                </label>
                <input
                  name="degree"
                  type="text"
                  className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={addnewN ? '' : singleData.degree}
                  required=""
                  value={values.degree}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.degree && touched.degree ? (
                  <p className="form-error text-red-600">{errors.degree}</p>
                ) : null}
              </div>
              <div className="mb-6  m-4">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Field of Study
                </label>
                <input
                  type="text"
                  id="email"
                  name="field_of_study"
                  className=" focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={addnewN ? '' : singleData.field_of_study}
                  required=""
                  value={values.field_of_study}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.field_of_study && touched.field_of_study ? (
                  <p className="form-error text-red-600">
                    {errors.field_of_study}
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
                    type="submit"
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
    );
  }
}

export default Education;
