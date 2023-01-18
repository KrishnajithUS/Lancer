/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
import React from 'react';

import { BsEmojiSmile } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';

function ChatInputComponent() {
  return (
    <form className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      {/* <div>sending files in future</div> */}

      <div className="flex-grow ml-4">
        <div className="relative w-full">
          {/* imogi section starts */}
          <div className="absolute flex items-center justify-center h-full w-12 right-left top-0 ">
            <div className="emoji-wrap">
              <BsEmojiSmile
                className="w-6 h-6 text-gray-500"
                // onClick={handleImogy}
              />
            </div>
          </div>

          <input
            type="text"
            placeholder="type your message here..."
            className="pl-11 flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        {/* send button starts  */}

        <button
          type="submit"
          className="flex gap-1 items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
        >
          <span>Send</span>

          <AiOutlineSend />
        </button>

        {/* send button ends */}
      </div>
    </form>
  );
}

export default ChatInputComponent;
