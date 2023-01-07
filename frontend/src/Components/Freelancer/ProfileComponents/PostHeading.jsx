import React from 'react';

function PostHeading() {
  return (
    <div className="flex flex-col items-center mb-8  justify-center">
      <div className="">
        <h2 className="mb-2 text-black text-3xl lg:text-4xl tracking-tight font-extrabold">
          Your Posts
        </h2>
      </div>
      <div>
        <button
          type="button"
          className="focus:outline-none  text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >
          Create New
        </button>
      </div>
    </div>
  );
}

export default PostHeading;
