/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

function Tables({ table }) {
  if (table) {
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
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">

              <td className="py-4 px-6">1</td>
              <td className="py-4 px-6">Anil pk</td>
              <td className="py-4 px-6">Ani@455</td>
              <td className="py-4 px-6">Ani88@gmail.com</td>
              <td className="py-4 px-6">null</td>
              <td className="py-4 px-6">
                <AiFillUnlock />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return <h1>Freelancer table</h1>;
}

export default Tables;
