import React from 'react';
import { FaPlusSquare, FaEye } from 'react-icons/fa';
import { MdSubscriptions } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
      <aside className="" aria-label="Sidebar">
        <div className="px-3 py-4 overflow-y-auto rounded">
          <ul className="space-y-2 ">
            <li>
              <Link to="/post">
                <button
                  type="button"
                  className="hover:text-white flex  items-center w-full p-2 text-base font-normal text-gray-900 rounded-lg  hover:bg-gray-100 dark:hover:bg-purple-700"
                >
                  <FaPlusSquare />
                  <span className="flex-initial ml-3 whitespace-nowrap">
                    Post
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <button
                type="button"
                className="flex w-full hover:text-white items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-purple-700"
              >
                <MdSubscriptions />
                <span className="flex-initial ml-3 whitespace-nowrap">
                  Buy A Pakage
                </span>
              </button>
            </li>
            <li>
              <Link to="publicprofile">
                <button
                  type="button"
                  className="flex w-full hover:text-white items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-purple-700"
                >
                  <FaEye />

                  <span className="flex-initial ml-3 whitespace-nowrap">
                    Public Profile View
                  </span>
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;
