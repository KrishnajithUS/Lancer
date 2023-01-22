/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-multi-spaces */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function SelectionPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const handlesubmit = () => {
    if (value === 'client') {
      console.log('client');
      navigate('/register');
    }
    if (value === 'freelancer') {
      console.log('freelancer');
      navigate('/fregister');
    }
  };
  console.log(value);
  let button;
  if (value === 'client') {
    button = (
      <button
        disabled={!value}
        type="submit"
        onClick={handlesubmit}
        className="md:h-[70%] w-[60%] col-span-4 m-2 mt:0 md:mr-24 md:ml-24 text-xs  p-3 md:text-sm   bg-black hover:bg-purple-400 text-white font-bold border  rounded"
      >
        Join as Client
      </button>
    );
  } else {
    button = (
      <button
        disabled={!value}
        type="submit"
        onClick={handlesubmit}
        className="md:h-[70%] w-[60%] col-span-4 m-2 mt:0 md:mr-24 md:ml-24 text-xs  p-3 md:text-sm   bg-black hover:bg-purple-400 text-white font-bold border  rounded"
      >
        Join as Freelancer
      </button>
    );
  }
  const handleClick = () => {
    setValue('freelancer');
  };
  const handleClickL = () => {
    setValue('client');
  };
  return (
    <div>
      <div className="md:mt-12 mt-10 h-screen">
        <div className="text-center ">
          <h3 class="mb-5 inline-block text-3xl md:text-4xl font-bold  text-gray-900 dark:text-white">
            Join as a Freelancer or Client
          </h3>
        </div>
        <div className="m-4 md:mr-32 md:ml-32 ">
          <ul class="grid gap-6 w-full  md:grid-cols-2 ">
            <li onClick={handleClick}>
              <input
                type="radio"
                id="hosting-small"
                name="hosting"
                value="hosting-small"
                class="hidden peer"
                required
              />
              <label
                for="hosting-small"
                class="inline-flex justify-between items-center p-5 w-full text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-purple-500 peer-checked:border-purple-600 peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-black dark:bg-gray-300 dark:hover:bg-black"
              >
                <div class="block ">
                  <div class="w-full md:h-24 flex items-center justify-center">
                    I'm a Freelancer
                  </div>
                </div>
                <svg
                  aria-hidden="true"
                  class="ml-3 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
            </li>
            <li onClick={handleClickL}>
              <input
                type="radio"
                id="hosting-big"
                name="hosting"
                value="hosting-big"
                class="hidden peer"
              />
              <label
                for="hosting-big"
                class="inline-flex justify-between items-center p-5 w-full text-black bg-white rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-purple-500 peer-checked:border-purple-600 peer-checked:text-black hover:text-gray-600 hover:bg-gray-100 dark:text-black dark:bg-gray-300 dark:hover:bg-black"
              >
                <div class="block">
                  <div class="w-full md:h-24 flex items-center justify-center ">
                    I'm a Client
                  </div>
                </div>
                <svg
                  aria-hidden="true"
                  class="ml-3 w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </label>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          {value ? (
            button
          ) : (
            <button
              disabled
              cursor-not-allowed
              type="button"
              className="md:h-[70%] w-[60%] m-2 mt:0 text-xs  p-3 md:text-sm   bg-slate-400"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SelectionPage;
