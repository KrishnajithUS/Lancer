import React from 'react';

function ImageUploader({ handleFile }) {
  const hiddenFileInput = React.useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        type="button"
        className="focus:outline-none text-xs text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-small rounded-lg  px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
      >
        change picture
      </button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </div>
  );
}

export default ImageUploader;
