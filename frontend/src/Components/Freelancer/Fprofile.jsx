/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Navbar from '../Constants/Navbar';
import Education from './ProfileComponents/Education';
import Personal from './ProfileComponents/Personal';
import Experience from './ProfileComponents/Experience';
import Skills from './ProfileComponents/Skills';
import Card from './ProfileComponents/Card';
// import EduCard from './ProfileComponents/EduCard';

function Fprofile() {
  return (
    <div>
      <Navbar />
      <div className="m-4 md:m-8">
        <div className="grid grid-cols-3  gap-4  ">
          <div className=" col-span-3 md:col-span-1 w-full order-1  ">
            <div className="grid grid-cols-1 gap-4">
              <div className="col-span-1  bg-zinc-200 rounded-lg  ">
                <div className="flex flex-col align-center items-center pb-2">
                  <img
                    className="w-24 h-24 mt-2 rounded-full "
                    src=""
                    alt="image_"
                  />
                  <h5 className="mb-1 text-xl font-medium text-black dark:text-black">
                    Bonnie Green
                  </h5>
                  <span className="text-sm text-black dark:text-black-400">
                    Visual Designer
                  </span>
                </div>
              </div>
              <div className="bg-zinc-200 order-3 mb-10 h-24 col-span-1 rounded-lg  md:col-start-1 md:col-end-2 ">
                <div className="p-6 border border-white-200 rounded-lg drop-shadow-x dark:border-white-700">
                  <p>
                    <h5 className="mb-2 text-lg  font-bold dark:text-black">
                      Bio
                    </h5>
                  </p>
                  <p className="mb-3 font-normal text-white-500 dark:text-white-400">
                    No bio Provided
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Personal />

          <Experience />
          <Card data="skills" />
          {/* <EduCard data="education" /> */}
        </div>
      </div>
    </div>
  );
}

export default Fprofile;
