/* eslint-disable camelcase */
/* eslint-disable max-len */
import React from 'react';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { cprofileSchema } from '../../../schemas';
import { FDetails } from '../../../Redux/Freducer';

function Personal({ id, api, dispatch, data }) {
  const FirstName = useSelector((state) => (state.user.userDetails
    ? state.freelancer.FreelancerDetails.first_name
    : null));
  console.log(useSelector((state) => state));
  const userName = useSelector((state) => (state.user.userDetails ? state.freelancer.FreelancerDetails.username : null));
  console.log(useSelector((state) => state));
  const email = useSelector((state) => (state.user.userDetails ? state.freelancer.FreelancerDetails.email : null));
  console.log(useSelector((state) => state));
  const lastName = useSelector((state) => (state.user.userDetails ? state.freelancer.FreelancerDetails.last_name : null));
  const bio = useSelector((state) => (state.user.userDetails ? state.freelancer.FreelancerDetails.bio : null));
  const title = useSelector((state) => (state.user.userDetails ? state.freelancer.FreelancerDetails.title : null));
  const social_media = useSelector((state) => (state.user.userDetails
    ? state.freelancer.FreelancerDetails.social_media
    : null));

  const initialValues = {
    username: '',
    first_name: '',
    last_name: '',
    title: '',
    bio: '',
    social_media_links: '',
    email: '',
    password: '',
    new_password: '',
    confirm_new_password: '',
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
    validationSchema: cprofileSchema,
    onSubmit: async (values, actions) => {
      console.log(values);
      const Response = await api.put('fupdate/', {
        id,
        title: values.title,
        bio: values.bio,
        social_media_links: values.social_media,
        user: {
          username: values.username,
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          password: values.password,
          new_password: values.new_password,
          confirm_new_password: values.confirm_new_password,
        },
      });

      dispatch(FDetails(Response.data));
      // updating the parent component for fetching the latest data
      data();

      actions.resetForm();
    },
  });
  console.log(values);
  console.log(errors);
  return (
    <>
      {' '}
      <div className="shadow-2xl bg-white border  border-gray-400 order-2 rounded-lg  col-span-3 md:col-start-2 col-end-4">
        <div className="m-8">
          <form onSubmit={handleSubmit}>
            <div className="pt-2 pl-3 ">
              <h6 className="text-lg  font-bold dark:text-black">
                Personal Informations
              </h6>
            </div>

            <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-dark"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  name="first_name"
                  autoComplete="off"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={FirstName}
                  required=""
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.first_name && touched.first_name ? (
                  <p className="form-error text-red-600">{errors.first_name}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Last name
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="last_name"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={lastName}
                  required=""
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.last_name && touched.last_name ? (
                  <p className="form-error text-red-600">{errors.last_name}</p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-dark"
                >
                  Title(Related to Your service)
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="title"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={title}
                  required=""
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title ? (
                  <p className="form-error text-red-600">{errors.title}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="social_media"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Social Media links
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="social_media"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={social_media}
                  required=""
                  value={values.social_media}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.social_media && touched.social_media ? (
                  <p className="form-error text-red-600">
                    {errors.social_media}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="grid gap-6 m-4 mb-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  username
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  id="email"
                  name="username"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={userName}
                  required=""
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username ? (
                  <p className="form-error text-red-600">{errors.username}</p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
                >
                  Email address
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  placeholder={email}
                  required=""
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error text-red-600">{errors.email}</p>
                ) : null}
              </div>
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="bio"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Update Your Bio
              </label>
              <input
                type="text"
                autoComplete="off"
                name="bio"
                value={values.bio}
                placeholder={bio}
                onChange={handleChange}
                onBlur={handleBlur}
                className="border-2 border-black focus:border-purple-600 focus:outline-none block w-full p-4 text-white-900  rounded-lg bg-white sm:text-md  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
              />
              {errors.bio && touched.bio ? (
                <p className="form-error text-red-600">{errors.bio}</p>
              ) : null}
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Old Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="Old Password"
                required=""
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password ? (
                <p className="form-error text-red-600">{errors.password}</p>
              ) : null}
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                New Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="new_password"
                className="border-2 border-black focus:border-purple-600 focus:outline-none bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="New Password"
                required=""
                value={values.new_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.new_password && touched.new_password ? (
                <p className="form-error text-red-600">{errors.new_password}</p>
              ) : null}
            </div>
            <div className="mb-6  m-4">
              <label
                htmlFor="confirm_new_password"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-black"
              >
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="off"
                name="confirm_new_password"
                className="border-2 border-black focus:border-purple-600 focus:outline-none  bg-white  text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                placeholder="confirm password"
                required=""
                value={values.confirm_new_password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.confirm_new_password && touched.confirm_new_password ? (
                <p className="form-error text-red-600">
                  {errors.confirm_new_password}
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Personal;
