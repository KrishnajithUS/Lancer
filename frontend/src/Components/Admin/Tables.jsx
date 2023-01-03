/* eslint-disable quotes */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import { React, useState, useEffect } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import useAxiosAdmin from '../../Axios/userAxiosAdmin';

function Tables() {
  const api = useAxiosAdmin();
  const id = useSelector((state) => state.admin.admin.id);
  const [userDetails, setUserDetails] = useState([]);
  const data = async () => {
    try {
      const response = await api.post(`/cprofileData/`, {
        id,
        is_admin: true,
      });
      setUserDetails(response.data);
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
    <div className="overflow-x-auto flex justify-center relative">
      <table className="w-[100%] text-sm text-left text-gray-500 dark:text-gray-400">
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
              Actions
            </th>
          </tr>
        </thead>
        {userDetails.map((item) => {
          return (
            <tbody key={item.email}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="py-4 px-6">{item.id ? item.id : null}</td>
                <td className="py-4 px-6">
                  {item.first_name}
                  <br />
                  {item.last_name}
                </td>
                <td className="py-4 px-6">{item.username}</td>
                <td className="py-4 px-6">{item.email}</td>
                <td className="py-4 px-6">null</td>
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
  );
}

export default Tables;
