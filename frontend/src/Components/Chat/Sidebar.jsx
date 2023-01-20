/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Sidebar({ chatData }) {
  console.log(chatData);
  const fusername = useSelector(
    (state) => state.freelancer?.FreelancerDetails.username
  );
  const uusername = useSelector((state) => state.user?.userDetails.username);
  console.log(uusername);
  function createConversationName(username) {
    console.log(username, 'username inside function');
    const namesAlph = [username, fusername || uusername].sort();
    const name = `${namesAlph[0]}__${namesAlph[1]}`;
    console.log('conversation name', name);
    return `${namesAlph[0]}__${namesAlph[1]}`;
  }
  return (
    <div>
      <div className="col-span-1 bg-white border-r border-gray-300">
        <ul className="overflow-auto" style={{ height: 500 }}>
          <h2 className="ml-2 mb-2 text-gray-600 text-lg my-2">Chats</h2>
          {chatData.username?.map((item) => (
            <li>
              <button
                type="button"
                className="hover:bg-gray-100 border-b border-gray-300 px-3 py-2 cursor-pointer flex items-center text-sm focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  alt="username"
                />
                <div className="w-full pb-2">
                  <div className="flex justify-between">
                    {fusername ? (
                      <Link to={`/fchat/${createConversationName(item)}`}>
                        <span className="block ml-2 font-semibold text-base text-gray-600 ">
                          {item}
                        </span>
                      </Link>
                    ) : (
                      <Link to={`/chat/${createConversationName(item)}`}>
                        <span className="block ml-2 font-semibold text-base text-gray-600 ">
                          {item}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
