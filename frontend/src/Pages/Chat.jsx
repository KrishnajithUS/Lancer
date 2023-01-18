import React from 'react';
import Sidebar from '../Components/Chat/Sidebar';
import Content from '../Components/Chat/Content';

function Chat() {
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
            <Sidebar />
            <div className="col-span-2 bg-white">
              <Content />
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Chat;
