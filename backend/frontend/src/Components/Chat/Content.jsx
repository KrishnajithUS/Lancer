/* eslint-disable comma-dangle */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';

function Content({ conversationName }) {
  const authTokens = useSelector(
    (state) => state.freelancer.token.access_token
  );
  const chatuser = conversationName.split('__');
  console.log('chat user', chatuser);
  const userTokens = useSelector((state) => state.user.token.access_token);
  const [name, setName] = useState('');
  const messageEl = React.useRef(null);
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener('DOMNodeInserted', (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, []);
  const [messageHistory, setMessageHistory] = useState([]);
  const [message, setMessage] = useState('');
  const username = useSelector(
    (state) => state.freelancer.FreelancerDetails.username
  );
  const currentUser = useSelector((state) => state.user.userDetails.username);
  function formatMessageTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString().slice(0, 5);
  }
  console.log('username', username);
  const otherUser = chatuser.filter((name) => name !== username || currentUser);
  const otherUserName = otherUser.shift();

  const { readyState, sendJsonMessage } = useWebSocket(
    authTokens || userTokens
      ? `wss://lan-cer.online:9001/${conversationName}/`
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
            setMessageHistory((prev) => [...prev, data.message]);
            sendJsonMessage({ type: 'read_messages' });

            break;
          default:
            console.error('unknown type');
            break;
        }
      },
    }
  );
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];
  useEffect(() => {
    if (connectionStatus === 'Open') {
      sendJsonMessage({
        type: 'read_messages',
      });
    }
  }, [connectionStatus, sendJsonMessage]);
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
    <div className="mb-20">
      <div className="flex items-center   z-10 border-b border-gray-300 pl-3 py-3">
        <img
          className="h-10 w-10 rounded-full object-cover"
          src="https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
          alt="username"
        />
        <span className="block ml-2 font-bold text-base text-gray-600">
          {otherUserName}
        </span>
        <span className="connected text-green-500 ml-2">
          <svg width={6} height={6}>
            <circle cx={3} cy={3} r={3} fill="currentColor" />
          </svg>
        </span>
      </div>

      <div
        id="chat"
        ref={messageEl}
        className="w-full bg-gray-200 overflow-y-auto p-10 relative"
        style={{ height: 700 }}
      >
        <ul>
          {messageHistory.map((item) => (
            <li className="clearfix2">
              {item.from_user.username !== (username || currentUser) && (
                <div className="w-full flex justify-end">
                  <div
                    className="bg-white shadow-md rounded-lg px-5 py-2 my-2 text-gray-700 relative"
                    style={{ maxWidth: 300 }}
                  >
                    <span className="block">{item.content}</span>
                    <span className="block text-xs text-right">
                      {formatMessageTimestamp(item.timestamp)}
                    </span>
                  </div>
                </div>
              )}

              {item.from_user.username === (username || currentUser) && (
                <div className="w-full flex justify-start">
                  <div
                    className="bg-white shadow-md rounded-lg px-5 py-2 my-2 text-gray-700 relative"
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
        <input
          placeholder="type message here.."
          className="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 forcus:border-2 border-black focus:border-purple-600 focus:outline-none"
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
            className="text-purple-500 h-7 w-7  origin-center transform rotate-90"
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
