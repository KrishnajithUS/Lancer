/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxios from '../../Axios/useAxios';

function Packages() {
  const [data, setData] = useState([]);
  const api = useAxios();
  const response = async () => {
    const Response = await api.get(`packages`);
    console.log(Response);
    setData(Response.data);
  };
  useEffect(() => {
    response();
  }, []);
  return (
    <div>
      <section className="bg-white ">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16  lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
              Buy A Package
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {data?.map((item) => (
              <div
                key={item.id}
                className="space-y-8 col-span-full md:col-span-1"
              >
                <div className="flex flex-col p-6 mx-auto max-w-lg bg-gray-100 shadow-xl border-2 border-gray-500 text-center text-gray-900  rounded-lg shadow ">
                  <h3 className="mb-4 text-2xl font-semibold">{item.title}</h3>

                  <div className="flex justify-center items-baseline my-8">
                    <span className="mr-2 text-4xl font-extrabold">
                      &#8360; {item.price}
                    </span>
                  </div>
                  <div className="flex w-full justify-center">
                    <ul role="list" className="mb-8 space-y-4 text-left">
                      <li className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>{' '}
                        <span>
                          No of Posts:
                          <span className="font-semibold ">
                            {item.no_of_posts}
                          </span>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <Link to={`/payment/${item.id}`}>
                    <button
                      type="button"
                      className="text-white hover:bg-purple-900 bg-purple-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    >
                      Buy
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Packages;
