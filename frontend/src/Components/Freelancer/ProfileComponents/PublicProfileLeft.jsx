import React from 'react';

function PublicProfileLeft({ eduData, expData, skill }) {
  return (
    <div className="md:col-span-2 w-[100%] lg:w-[98%] col-span-4  lg:m-5 lg:mt-0 md:mb-20 ">
      <div className="flex flex-col  jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Experience
              </h5>
            </div>
            {expData.map((item) => (
              <div className="flex">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                    {item.company}
                  </p>
                </div>
                <div className=" min-w-0">
                  <p className="text-md font-medium text-gray-900 truncate dark:text-black">
                    {item.no_of_years}
                    {' '}
                    years of experience
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Skills
              </h5>
            </div>
            {skill.map((item) => (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                  {item.skills}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col jusfity-center h-full  m-5 md:mb-0 md:m-5 bg-gray-50 border border-gray-300  rounded-lg shadow-lg shadow-gray-700 ">
        <div className="p-5">
          <div className="flex flex-col">
            <div>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                Education
              </h5>
            </div>

            {eduData.map((item) => (
              <div className="flex">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-black">
                    {item.university}
                  </p>
                </div>
                <div className=" min-w-0">
                  <p className="text-md font-medium text-gray-900 truncate dark:text-black">
                    <span className="pr-2">
                      {' '}
                      {item.degree}
                    </span>
                    <span>{item.field_of_study}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfileLeft;
