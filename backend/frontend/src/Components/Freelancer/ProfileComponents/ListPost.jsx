import React from 'react';
import { Link } from 'react-router-dom';

function ListPost({ dataHandler }) {
  console.log(dataHandler);
  return dataHandler.map((item) => (
    <div className="md:col-span-2 col-span-4  mb-10 mt-5">
      <div className=" h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-100  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="m-2">
          <img
            className="rounded-t-lg w-full "
            src={`https://lan-cer.online${item?.cover_image}`}
            alt="img"
          />
        </div>
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {item?.title}
              </h5>
            </div>
            <div>
              <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                Description
              </h5>
            </div>
            <div>
              <p className="mb-3 font-normal text-gray-700 ">
                {item?.description}
              </p>
            </div>
            <div className="text-dark mb-2">
              <span>Starting Price :</span>
              <span>
                {' '}
                {item?.price}
                {' '}
                &#8377;
              </span>
            </div>
            <div>
              <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                Key Features
              </h5>
              <p className="mb-3 font-normal text-gray-700  mt-0">
                {item.keyfeatures}
              </p>
            </div>
            <div>
              <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                Specialization
              </h5>
              <p className="mb-3 font-normal text-gray-700  mt-0">
                {item.specialization}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <Link to={`/updatepost/${item.id}`}>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:cursor-pointer bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 "
                >
                  Update
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white hover:cursor-pointer bg-purple-700 rounded-lg hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 "
              >
                Publish
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));
}

export default ListPost;
