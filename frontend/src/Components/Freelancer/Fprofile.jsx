import { React, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import profile1 from '../../Assets/profile1.svg';

import Personal from './ProfileComponents/Personal';

import ImageUploader from './ProfileComponents/ImageUploader';
import Card from './ProfileComponents/Card';
import useAxios from '../../Axios/useAxios';
import { FDetails } from '../../Redux/Freducer';
import Sidebar from './ProfileComponents/Sidebar';

// import EduCard from './ProfileComponents/EduCard';

function Fprofile() {
  const dispatch = useDispatch();
  const api = useAxios();
  const [dataHandler, setDataHandler] = useState([]);

  const id = useSelector((state) => state.freelancer.Freelancer.id);
  const data = async () => {
    try {
      const response = await api.post(`/cprofileData/`, {
        id,
      });
      console.log('response', response.data);

      dispatch(FDetails(response.data));

      setDataHandler([response.data]);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFile = async (args) => {
    try {
      console.log(args, 'file details');
      const formData = new FormData();
      formData.append('profile_picture', args);
      formData.append('id', id);
      await api.patch(`/fupdate/`, formData);
      data();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    data();
  }, [dispatch]);
  return (
    <div>
      <div className="m-4 md:m-8">
        <div className="grid grid-cols-3  gap-4  ">
          <div className=" col-span-3 md:col-span-1 w-full order-1  ">
            {dataHandler.map((item) => {
              return (
                <div className="grid grid-cols-1 gap-4">
                  <div className="col-span-1  bg-zinc-200 rounded-lg  ">
                    <div className="flex flex-col align-center items-center pb-2">
                      <img
                        className="w-24 h-24 mt-2 rounded-full "
                        src={
                          item.fprofile_picture
                            ? `http://localhost:8000${item.fprofile_picture}`
                            : profile1
                        }
                        alt="image_"
                      />

                      <h5 className="mb-1 text-xl font-medium text-black dark:text-black">
                        <span>{item.first_name}</span>
                      </h5>
                      <span className="text-sm text-black dark:text-black-400">
                        {item.title ? item.title : 'NO info'}
                      </span>
                      <div className=" mt-2">
                        <ImageUploader handleFile={handleFile} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-200 order-3 mb-10 h-24 col-span-1 rounded-lg  md:col-start-1 md:col-end-2 ">
                    <div className="bg-zinc-200 p-6 border border-white-200 rounded-lg drop-shadow-x dark:border-white-700">
                      <p>
                        <h5 className="mb-2 text-lg  font-bold dark:text-black">
                          Bio
                        </h5>
                      </p>
                      <p className="mb-3 font-normal text-white-500 dark:text-white-400">
                        {item.bio ? item.bio : 'NO Bio'}
                      </p>
                    </div>
                  </div>
                  <div className="bg-zinc-200 order-3 mb-10  col-span-1 rounded-lg  md:col-start-1 md:col-end-2 ">
                    <Sidebar />
                  </div>
                </div>
              );
            })}
          </div>

          <Personal id={id} api={api} data={data} dispatch={dispatch} />

          <Card data="Experience" />
          <Card data="skills" />
          <Card data="Education" />
          {/* <EduCard data="education" /> */}
        </div>
      </div>
    </div>
  );
}

export default Fprofile;
