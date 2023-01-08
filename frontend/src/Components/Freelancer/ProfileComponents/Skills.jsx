import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import useAxios from '../../../Axios/useAxios';
import { cprofileSchema } from '../../../schemas';
import { modalStatus, modalStatusN } from '../../../Redux/Freducer';

function Skills({ addskill, skills }) {
  const api = useAxios();

  const dispatch = useDispatch();
  const check = useSelector((state) => state.freelancer.modelStatus);
  const checkL = useSelector((state) => state.freelancer.modelStatusN);
  const singleData = useSelector((state) => state.freelancer.skills);

  const id = singleData.id ? singleData.id : null;

  const handleChangeL = () => {
    dispatch(modalStatus('hidemodal'));
  };
  const handleChangeL2 = () => {
    dispatch(modalStatusN('hidemodal'));
  };

  const initialValues = {
    skills: '',
  };
  const handleDelete = async () => {
    try {
      console.log(addskill, 'addskill');
      await api.post(`skills/`, {
        id,
        is_delete: true,
      });
      skills();
      handleChangeL();
    } catch (err) {
      alert(err);
    }
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
      console.log(addskill, 'addskill');
      if (checkL === 'showmodal') {
        try {
          console.log(addskill, 'addskill');
          await api.post(`skills/`, {
            skills: values.skills,
            id,
          });
          skills();
        } catch (err) {
          alert(err);
        }
        handleChangeL();
      } else {
        console.log('if not the id is present');
        try {
          await api.put(`skills/`, {
            skills: values.skills,
            id,
          });
          skills();
        } catch (err) {
          alert(err);
        }
      }

      handleChangeL();
      actions.resetForm();
    },
  });
  console.log(values);
  console.log(errors);

  return (
    <>
      {checkL === 'showmodal' ? (
        <div
          tabIndex={-1}
          className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full"
        >
          <div className="shadow-2xl bg-white md:w-[50%]  border  border-gray-500  md:h-[50%] w-full h-[50%] relative  rounded-lg">
            <div className="relative">
              <button
                onClick={handleChangeL2}
                type="button"
                className="absolute top-3 right-2.5 text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-dark"
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
              <form
                className="w-full pl-2 pr-2 md:pl-0 md:pr-0"
                onSubmit={handleSubmit}
              >
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
                    placeholder=""
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
                    className="mr-2  mb-2 text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          {check === 'showmodal' ? (
            <div
              tabIndex={-1}
              className="fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full"
            >
              <div className="bg-zinc-200 md:w-[50%] md:h-[50%] w-full h-[50%] relative  rounded-lg">
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
                  <form
                    className="w-full pl-2 pr-2 md:pl-0 md:pr-0"
                    onSubmit={handleSubmit}
                  >
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
                          singleData.skills
                            ? singleData.skills
                            : 'enter a skill'
                        }
                        required=""
                        value={values.skills}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.skills && touched.skills ? (
                        <p className="form-error text-red-600">
                          {errors.skills}
                        </p>
                      ) : null}
                    </div>

                    <div className="m-4 ">
                      <button
                        type="submit"
                        className="mr-2  mb-2 text-black bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        className="mr-2   text-black bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:rinred-300 font-medium rounded-lg text-xs w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red  "
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}

export default Skills;
