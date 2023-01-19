import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Components/Chat/Sidebar';
import Content from '../Components/Chat/Content';
import useAxios from '../Axios/useAxios';

function Chat() {
  const { conversationName } = useParams();
  console.log(conversationName, 'conversationame');
  const api = useAxios();
  const [chatData, setChatData] = useState([]);
  const data = async () => {
    const response = await api.get('chatuser/');
    console.log(response);
    setChatData(response.data);
  };
  useEffect(() => {
    data();
  }, []);
  return (
    <div>
      <>
        {/* component */}
        {/* This is an example component */}
        <div className="w-screen">
          <div
            className="grid grid-cols-3 min-w-full border rounded"
            style={{ minHeight: '80vh' }}
          >
            <Sidebar chatData={chatData} />
            <div className="col-span-2 bg-white">
              {conversationName ? (
                <Content
                  chatData={chatData}
                  conversationName={conversationName}
                />
              ) : (
                <h1>click a user to chat</h1>
              )}
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Chat;
