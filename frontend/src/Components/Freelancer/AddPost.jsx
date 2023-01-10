/* eslint-disable no-extra-boolean-cast */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import useAxios from '../../Axios/useAxios';
import { AddPostSchema } from '../../schemas';

function AddPost() {
  const api = useAxios();
  const [categoryList, SetCategoryList] = useState([]);
  const [subcategoryList, SetsubCategoryList] = useState([]);
  const [subselect, subsetSelect] = useState(null);
  const [select, setSelect] = useState(null);
  console.log('category', select);
  const initialValues = {
    title: '',
    cover_image: '',
    description: '',
    price: '',
    features: '',
    specialization: '',
  };

  const getCategory = async () => {
    const Response = await api.post(`/cpost/`, {
      get_category: true,
    });
    SetCategoryList(Response.data);
  };
  const getSubCategory = async () => {
    const response = await api.post(`/cpost/`, {
      get_sub_category: true,
      category: select,
    });
    SetsubCategoryList(response.data);
    console.log(response.data);
  };
  console.log(categoryList);
  // useEffect(() => {
  //   getCategory();
  // }, []);
  const handleChangeLL = (e) => {
    console.log('id', e.target.value);
    setSelect(e.target.value);
    getCategory();
  };
  const handleChangeN = (e) => {
    subsetSelect(e.target.value);
    getSubCategory();
  };

  const navigate = useNavigate();
  const {
    values,
    errors,
    handleBlur,

    setFieldValue,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: AddPostSchema,

    onSubmit: async (values, action) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('cover_image', values.file);
      formData.append('description', values.description);
      formData.append('price', values.price);
      formData.append('category', select);
      formData.append('sub_category', subselect);
      formData.append('specialization', values.specialization);
      formData.append('keyfeatures', values.features);
      try {
        const response = await api.post(`/cpost/`, formData);

        if (response.status === 201) {
          navigate('/post');
        } else {
          alert('not valid credentials');
        }
      } catch (error) {
        alert(error);
        console.log(error);
      }
      action.resetForm();
    },
  });
  console.log(setFieldValue);
  console.log(errors);
  return (
    <div className=" w-full md:h-full h-screen">
      <div className="grid grid-cols-10 gap-4 m-4 md:m-10">
        <div className="col-start-2 col-span-8 ">
          <h1 className="text-black font-bold text-xl md:text-3xl  mb-2">
            ADD POST
          </h1>

          <div className=" p-4">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-6 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Title
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    placeholder="Post Title"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Cover Image
                  </label>
                  <input
                    accept="image/*"
                    multiple={false}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    type="file"
                    name="file"
                    id="file"
                    onChange={(event) => {
                      handleChange(event);
                      setFieldValue('file', event.currentTarget.files[0]);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2  text-sm font-medium text-gray-900 ">
                    category
                  </label>
                  <select
                    required
                    onClick={handleChangeLL}
                    className=" text-gray-900  border-2 border-black  focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  >
                    {categoryList.length > 1 ? (
                      ''
                    ) : (
                      <option>Select a Category</option>
                    )}
                    {categoryList.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.category_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    sub category
                  </label>
                  <select
                    required
                    onClick={handleChangeN}
                    className=" text-gray-900  border-2 border-black   focus:border-purple-600 focus:outline-none bg-white border border-slate-500 text-white-900 text-sm rounded-lg block w-full p-2.5  dark:border-white-600 dark:placeholder-slate-400 dark:text-black"
                  >
                    {subcategoryList.length > 1 ? (
                      ''
                    ) : (
                      <option>Select a sub Category</option>
                    )}
                    {subcategoryList.map((option) => (
                      <option value={option.id} key={option.id}>
                        {option.subcategory_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Add key Features of your service
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="features"
                    value={values.features}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    placeholder="Add Extra Features of Your Service"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Starting Price
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    placeholder="Enter Your Price  &#8377;"
                    required
                  />
                </div>
                <div className="col-span-full ">
                  <label className="block mb-2  text-sm font-medium text-gray-900 ">
                    Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-2
                              border-slate-800
                              h-[90%]
                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                             rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    placeholder="Description About Your Post"
                    required
                  />
                </div>
                <div className="col-span-full ">
                  <label className="block mb-2 mt-2 text-sm font-medium text-gray-900 ">
                    Specialization
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="specialization"
                    placeholder="specialization of your sevice"
                    value={values.specialization}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="

                              w-full
                              px-3 py-2
                              text-sm
                              border-slate-800

                              text-gray-700
                              bg-white bg-clip-padding

                              transition
                              ease-in-out
                              border-2 rounded shadow appearance-none focus:outline-none focus:shadow-outline

                              focus:text-gray-700 focus:bg-white focus:border-purple-600 "
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-2 justify-center mb-24">
                <button
                  type="submit"
                  className="inline-block px-6 py-2.5 bg-black text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out"
                >
                  POST
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
