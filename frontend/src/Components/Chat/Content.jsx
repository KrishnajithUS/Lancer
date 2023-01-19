/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';

function Content({ conversationName }) {
  const authTokens = useSelector(
    (state) => state.freelancer.token.access_token
  );
  const userTokens = useSelector((state) => state.user.token.access_token);
  const [name, setName] = useState('');

  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const username = useSelector(
    (state) => state.freelancer.FreelancerDetails.username
  );
  const uusername = useSelector((state) => state.user.userDetails.username);
  function formatMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }
  const { sendJsonMessage } = useWebSocket(
    authTokens || userTokens
      ? `ws://localhost:8000/${conversationName}/`
      : null,
    {
      queryParams: {
        token: authTokens || userTokens,
      },
      onOpen: () => {
        console.log('Connected!');
      },
      onClose: () => {
        console.log('Disconnected!');
      },
      onMessage: (e) => {
        const data = JSON.parse(e.data);
        console.log(data.message);
        switch (data.type) {
          case 'last_50_messages':
            setMessageHistory(data.messages);
            break;
          case 'chat_message_echo':
            console.log(data);
            setMessageHistory((prev) => prev.concat(data.message));

            break;
          default:
            console.error('unknown type');
            break;
        }
      },
    }
  );
  function handleChangeMessage(e) {
    console.log(e.target.value, 'the handlechange value');
    setMessage(e.target.value);
  }

  function handleSubmit() {
    sendJsonMessage({
      type: 'chat_message',
      message,
      name,
    });
    setName('');

    setMessage('');
  }
  console.log(messageHistory);
  return (
    <div className="w-full">
      <div className="flex items-center border-b border-gray-300 pl-3 py-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt="username"
        />
        <span className="block ml-2 font-bold text-base text-gray-600">
          Eduard
        </span>
        <span className="connected text-green-500 ml-2">
          <svg width={6} height={6}>
            <circle cx={3} cy={3} r={3} fill="currentColor" />
          </svg>
        </span>
      </div>
      <div
        id="chat"
        className="w-full overflow-y-auto p-10 relative"
        style={{ height: 700 }}
      >
        <ul>
          {messageHistory.map((item) => (
            <li className="clearfix2">
              {item.from_user.username !== (username || uusername) && (
                <div className="w-full flex justify-start">
                  <div
                    className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                    style={{ maxWidth: 300 }}
                  >
                    <span className="block">{item.content}</span>
                    <span className="block text-xs text-right">
                      {formatMessageTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              )}

              {item.from_user.username === (username || uusername) && (
                <div className="w-full flex justify-end">
                  <div
                    className="bg-gray-100 rounded px-5 py-2 my-2 text-gray-700 relative"
                    style={{ maxWidth: 300 }}
                  >
                    <span className="block">{item.content}</span>
                    <span className="block text-xs text-right">
                      {formatMessageTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
        <button type="button" className="outline-none focus:outline-none">
          <svg
            className="text-gray-400 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </button>
        <button type="button" className="outline-none focus:outline-none ml-1">
          <svg
            className="text-gray-400 h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </button>
        <input
          aria-placeholder="Escribe un mensaje aquí"
          placeholder="Escribe un mensaje aquí"
          className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700"
          type="text"
          name="message"
          value={message}
          onChange={handleChangeMessage}
        />
        <button
          onClick={handleSubmit}
          className="outline-none focus:outline-none"
          type="submit"
        >
          <svg
            className="text-gray-400 h-7 w-7 origin-center transform rotate-90"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Content;
