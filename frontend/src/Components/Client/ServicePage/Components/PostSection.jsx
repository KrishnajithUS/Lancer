import React from 'react';

function PostSection() {
  return (
    <div className="  flex justify-end">
      <div className="md:col-span-2 w-[100%] col-span-4 h-full lg:m-5 lg:mt-0 mb-20 ">
        <div className="flex flex-col jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
          <div className="m-5 border-2 border-gray-200 shadow-xl md:m-10   lg:24">
            <img
              className="rounded-t-lg w-full "
              src="https://miro.medium.com/max/915/0*4DpFVUP_VfkhzSIL"
              alt="img"
            />
          </div>
          <div className="p-5">
            <div className="flex flex-col">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  Tailwind Design
                </h5>
              </div>
              <div>
                <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                  Description
                </h5>
              </div>
              <div>
                <p className="mb-3 font-normal text-gray-700 ">
                  I will design tailwind css
                </p>
              </div>
              <div className="text-dark mb-2">
                <span>Starting Price :</span>
                <span> 700 &#8377;</span>
              </div>
              <div>
                <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                  Key Features
                </h5>
                <p className="mb-3 font-normal text-gray-700  mt-0">
                  FasterDeveloper
                </p>
              </div>
              <div>
                <h5 className="mb-2 text-xl underline tracking-tight text-gray-900 ">
                  Specialization
                </h5>
                <p className="mb-3 font-normal text-gray-700  mt-0">
                  Travel and tourism
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostSection;
