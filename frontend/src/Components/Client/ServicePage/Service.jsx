import React, { useEffect, useState } from 'react';

import ShwCaseCard from './ShwCaseCard';
import useAxios from '../../../Axios/useAxios';

function Service() {
  const [post, setPost] = useState([]);
  const [page, setPage] = useState(1);
  const api = useAxios();

  const getPost = async () => {
    try {
      const response = await api.get(`getallposts/?page=${page}`);
      setPost(response.data.results);

      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const ChangePage = (number) => {
    console.log('number', number);
    setPage(number);
    getPost();
  };

  console.log(post);
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <div className="min-h-screen">
        <ShwCaseCard ChangePage={ChangePage} page={page} post={post} />
      </div>
    </div>
  );
}

export default Service;
