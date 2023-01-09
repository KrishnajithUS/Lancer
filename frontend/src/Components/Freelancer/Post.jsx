/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import ListPost from './ProfileComponents/ListPost';
import useAxios from '../../Axios/useAxios';
import PostHeading from './ProfileComponents/PostHeading';

function Post() {
  const api = useAxios();
  const [dataHandler, setDataHandler] = useState([]);
  const postDetails = async () => {
    try {
      const response = await api.get(`/cpost/`);
      console.log('response', response.data);

      setDataHandler(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    postDetails();
  }, []);
  console.log(dataHandler, 'the post data');
  return (
    <div className="lg:m-52 mt-5 mb-10 lg:mt-10 md:m-20 md:mt-10">
      <div className="grid grid-cols-4 md:gap-4  content-center">
        <div className="col-span-4">
          <PostHeading />
        </div>
        {dataHandler.length < 1 ? (
          <div className="md:col-span-4    h-screen md:m-10 text-center col-span-4">
            <p className="mb-6 text-lg   font-bold font-xl md:text-3xl dark:text-gray-900">
              You Don't Have Any Posts Yet !
            </p>
          </div>
        ) : (
          ''
        )}
        <ListPost dataHandler={dataHandler} />
      </div>
    </div>
  );
}

export default Post;
