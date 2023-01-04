/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import useAxiosAdmin from '../../Axios/userAxiosAdmin';

function Ftables() {
  const api = useAxiosAdmin();
  const id = useSelector((state) => state.admin.admin.id);
  const [freelancerDetails, setFreelancerDetails] = useState([]);
  const data = async () => {
    try {
      const Response = await api.post(`/cprofileData/`, {
        id,

        is_freelancer: true,
      });

      setFreelancerDetails(Response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const datan = async (newid) => {
    try {
      await api.post(`/block/`, {
        newid,
        is_admin: true,
      });
      data();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data();
  }, []);
  const handleSubmit = (newid) => {
    datan(newid);
  };
  return (
    <div className="w-full  mx-auto">
      <div className="flex justify-center items-center">
        <div>
          <p className="m-4 text-bold text-lg font-3xl text-white">
            Freelancer Management
          </p>
        </div>
      </div>
      <div className="">
        <div className="overflow-x-auto ">
          <table className="  text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  id
                </th>

                <th scope="col" className="py-3 px-6">
                  Full Name
                </th>
                <th scope="col" className="py-3 px-6">
                  User Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Profile Picture
                </th>
                <th scope="col" className="py-3 px-6">
                  Bio
                </th>
                <th scope="col" className="py-3 px-6">
                  Title
                </th>
                <th scope="col" className="py-3 px-6">
                  Social media links
                </th>

                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            {freelancerDetails.map((item) => {
              return (
                <tbody key={item.email}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <td className="py-4 px-6">{item.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex">
                        <div className="pr-2">{item.first_name}</div>

                        <div>{item.last_name}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">{item.username}</td>
                    <td className="py-4 px-6">{item.email}</td>
                    <td className="py-4 px-6">
                      {item.fprofile_picture ? item.fprofile_picture : null}
                    </td>
                    <td className="py-4 px-6">{item.bio}</td>
                    <td className="py-4 px-6">{item.title}</td>
                    <td className="py-4 px-6">{item.social_media}</td>
                    <td className="py-4 px-6 ">
                      {item.is_active ? (
                        <button
                          className="text-green-500"
                          onClick={() => handleSubmit(item.id)}
                          type="submit"
                        >
                          <AiFillUnlock size={35} />
                        </button>
                      ) : (
                        <button
                          className="text-red-500"
                          onClick={() => handleSubmit(item.id)}
                          type="submit"
                        >
                          <AiFillLock size={35} />
                        </button>
                      )}
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default Ftables;
