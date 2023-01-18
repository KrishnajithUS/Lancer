/* eslint-disable comma-dangle */
/* eslint-disable new-cap */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable react/button-has-type */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ChatBox.css';
import { w3cwebsocket } from 'websocket';

function SmalllChatBox({ modal, showModal, post }) {
  console.log(post);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([]);
  const connectionRef = useRef(null);
  const userId = useSelector((state) => state.user.user?.id);
  const FreelancerId = post.user_id;
  console.log(FreelancerId);
  console.log(userId);

  connectionRef.client = new w3cwebsocket(
    'ws://localhost:8000/ws/chat/private/'
  );
  useEffect(() => {
    connectionRef.client.onopen = () => {
      console.log('connected');
      connectionRef.client.send(
        JSON.stringify({
          command: 'fetch_messages',
        })
      );
    };

    connectionRef.client.onmessage = (message) => {
      const data = JSON.parse(message?.data);
      // console.log(data);

      if (data.command === 'new_message') {
        console.log('inside command1');
        setMessages([...messages, data.message]);
      } else if (data.command === 'messages') {
        console.log('inside command1');
        setMessages(data.messages);
      } else {
        setMessages(data?.messages);
      }
    };
    return () => {
      if (connectionRef.current) {
        connectionRef.current.close();
      }
    };
  }, [setMessages]);
  const handleChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSend = () => {
    console.log(messageInput);
    connectionRef.client.send(
      JSON.stringify({
        command: 'new_messages',
        message: messageInput,
        user_id: userId,
        freelancer_id: FreelancerId,
      })
    );
    setMessageInput('');
  };

  const handleChangeL = () => {
    showModal('');
  };

  if (modal === 'showchat') {
    return (
      <div
        tabIndex={-1}
        className=" fixed flex justify-center items-center top-0 left-0 right-0 z-50  w-full p-4 overflow-x-hidden overflow-y-auto inset-0 h-modal h-full"
      >
        <div className="w-[60%] rounded-lg">
          <div className="chat-modal   show w-full  flex flex-col shadow-lg">
            {/* close button */}
            <div
              onClick={handleChangeL}
              className="close-chat bg-red-500 hover:bg-red-600 text-white mb-1 w-10 flex justify-center items-center px-2 py-1 rounded self-end cursor-pointer"
            >
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-x"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                />
              </svg>
            </div>
            {/* admin profile */}
            <div className="flex justify-between items-center  text-white p-2 bg-green-500 border shadow-lg mr-5 w-full">
              <div className="flex items-center">
                <img
                  src="https://f0.pngfuel.com/png/136/22/profile-icon-illustration-user-profile-computer-icons-girl-customer-avatar-png-clip-art-thumbnail.png"
                  alt="pic"
                  className="rounded-full w-8 h-8 mr-1"
                />
                <h2 className="font-semibold tracking-wider">HartDev</h2>
              </div>
              <div className="flex items-center justify-center">
                <small className="mr-1">online</small>
                <div className="rounded-full w-2 h-2 bg-white" />
              </div>
            </div>
            {/* chats */}
            <div className="flex flex-col bg-gray-200 px-2 chat-services expand overflow-auto">
              {messages.map((message) => (
                <div className="chat bg-white text-gray-700 p-2 self-start my-2 rounded-md shadow mr-3">
                  {message.content}
                </div>
              ))}
            </div>
            {/* send message */}
            <div className="relative bg-white">
              <input
                value={messageInput}
                onChange={handleChange}
                type="text"
                name="message"
                placeholder="ketik pesan anda"
                className="pl-4 pr-16 py-2 border border-green-500 focus:outline-none w-full"
              />
              <button
                onClick={handleSend}
                className="absolute right-0 bottom-0 text-green-600 bg-white  hover:text-green-500 m-1 px-3 py-1 w-auto transistion-color duration-100 focus:outline-none"
              >
                Send
              </button>
            </div>
          </div>
          <div className="show-chat hidden mx-10 mb-6 mt-4 text-green-500 hover:text-green-600 flex justify-center items-center cursor-pointer ">
            <svg
              width="4em"
              height="4em"
              viewBox="0 0 16 16"
              className="bi bi-chat-text-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM4.5 5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7zm0 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default SmalllChatBox;
