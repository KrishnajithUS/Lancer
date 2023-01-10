import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAxios from '../../../Axios/useAxios';

function PublicProfileLeft() {
  const api = useAxios();
  const FreelancerId = useSelector((state) => state.freelancer.Freelancer?.id);
  const data = async () => {
    try {
      const response = await api.post(`publicprofile/`, {
        id: FreelancerId,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
  }, []);
  console.log(FreelancerId, 'the freelancer id');
  return (
    <div className="md:col-span-2 w-[100%] lg:w-[98%] col-span-4  lg:m-5 lg:mt-0 md:mb-20 ">
      <div className="flex flex-col  jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Experience
              </h5>
            </div>

            <div>
              <p className="mb-3 font-normal text-gray-700 ">
                I will design tailwind css
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Skills
              </h5>
            </div>

            <div>
              <p className="mb-3 font-normal text-gray-700 ">
                I will design tailwind css
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Education
              </h5>
            </div>

            <div>
              <p className="mb-3 font-normal text-gray-700 ">
                I will design tailwind css
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfileLeft;
