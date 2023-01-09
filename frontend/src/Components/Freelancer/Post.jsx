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
    <div className="m-10">
      <div className="grid grid-cols-4 gap-4 ">
        <div className="col-span-4">
          <PostHeading />
        </div>

        <ListPost dataHandler={dataHandler} />
      </div>
    </div>
  );
}

export default Post;
