/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <>
      {/* Hello world */}
      <section>
        <div className="h-[80vh]">
          <div className="flex bg-white h-full itmes-center justify-center">
            <div className="flex  items-center  text-center lg:text-left px-8 md:px-12 lg:w-1/2">
              <div>
                <h2 className="text-3xl  font-semibold text-gray-800 md:text-4xl">
                  Find the perfect LANCER for
                  <br />
                  <span className="text-violet-600">your business</span>
                </h2>

                <p className="mt-2 text-sm text-gray-500 md:text-base">
                  Forget the old rules. You can have the best people. Right now.
                  Right here.
                </p>
                <div className="flex justify-center lg:justify-start mt-6">
                  <Link
                    className="px-4 py-3 bg-violet-600 text-gray-200 text-xs font-semibold rounded hover:bg-gray-800"
                    to="/select"
                  >
                    Get Started
                  </Link>
                  <a
                    className="mx-4 px-4 py-3 bg-gray-300 text-gray-900 text-xs font-semibold rounded hover:bg-gray-400"
                    href="#"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div
              className="hidden lg:block lg:w-1/2"
              style={{ clipPath: 'polygon(10% 0, 100% 0%, 100% 100%, 0 100%)' }}
            >
              <div
                className="h-full object-cover"
                style={{
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80)',
                }}
              >
                <div className="h-full bg-black opacity-25" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Banner;
