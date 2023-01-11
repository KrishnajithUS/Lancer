/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFreelancer } from '../../../Redux/reducer';
import profile1 from '../../../Assets/profile1.svg';
import PostDetailPage from './PostDetailPage';

function ShwCaseCard({ post, ChangePage, page }) {
  const page1 = page;

  const dispatch = useDispatch();
  const [detailView, setDetailView] = useState(false);
  const [singlePost, setSinglePost] = useState(false);

  console.log(useSelector((state) => state));
  const handleChange = (item) => {
    setSinglePost(item);
    dispatch(setFreelancer(item));

    setDetailView(true);
  };
  const handleChangeL = () => {
    console.log(page1);
    ChangePage(page1 + 1);
  };
  const handleChangeL2 = () => {
    if (page1 > 1) {
      ChangePage(page1 - 1);
    } else {
      ChangePage(1);
    }
  };

  if (detailView) {
    return <PostDetailPage setDetailView={setDetailView} post={singlePost} />;
  }
  return (
    <div className="mt-10 ml-4 mr-4 mb-10 ">
      <div className="grid grid-cols-10   gap-4">
        <div className="md:col-span-2 col-span-full">
          <div className="w-full p-6 rounded  bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700">
            <div className="space-y-2 py-4 overflow-y-auto  ">
              <h2 className="text-md font-bold tracking-widest uppercase dark:text-black">
                Filter
              </h2>
              <ul className="">
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white  dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Web Design</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-black hover:text-white dark:hover:bg-purple-700"
                  >
                    <span className="ml-3">Web Development</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="gap-4 col-start-2 col-end-10  md:col-span-8  border-gray-300">
          <div className="grid grid-cols-2 gap-4">
            {post.length > 0 &&
              post.map((item) => (
                <div
                  onClick={() => handleChange(item)}
                  className="md:col-span-1 col-span-2"
                >
                  {' '}
                  <div className="  hover:cursor-pointer p-2 bg-white  bg-gray-50 border border-gray-100  rounded-lg shadow-lg shadow-gray-700">
                    <div className="h-auto w-full rounded-lg bg-white border border-2">
                      <img
                        className=""
                        src={item.cover_image ? `${item.cover_image}` : ''}
                        alt="img"
                      />
                    </div>
                    <div className="flex flex-col ">
                      <div className="flex  mt-2 items-center  space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={
                              item.cover_image
                                ? `http://localhost:8000${item.profile_picture}`
                                : profile1
                            }
                            alt="img"
                          />
                        </div>
                        <div className="flex-1  min-w-0">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 truncate dark:text-black">
                              {item.first_name}
                            </p>
                          </div>
                        </div>
                        <div className="text-black">
                          <div>
                            <h3>Starting At</h3>
                          </div>
                          <div className="text-center text-bold">
                            <span>{item.price} $</span>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 pl-2 pb-2 hover:cursor-pointer hover:text-green-900 text-black ">
                        <h1>{item.description.slice(0, 50)} ....</h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex mt-4 justify-center">
            <button
              onClick={handleChangeL2}
              type="button"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-purple-700  hover:text-white  "
            >
              Previous
            </button>

            <button
              onClick={handleChangeL}
              type="button"
              className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-purple-700 hover:text-white "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShwCaseCard;
