// /* eslint-disable new-cap */
// import React, { useEffect } from 'react';
// import { w3cwebsocket } from 'websocket';
// import ChatContactComponent from './ChatContactComponent';
// import MainChatComponent
//  from './MainChatComponent';

// function Chat() {
//   const text = true;
//   const client = new w3cwebsocket('ws://localhost:8000/ws/chat/private/');
//   useEffect(() => {
//     client.onopen = () => {
//       console.log('connected');
//     };
//   }, []);
//   return (
//     <div className="flex h-screen antialiased text-gray-800">
//       <div className="flex flex-row h-full w-full overflow-x-hidden">
//         {/* profile and contact section */}
//         <ChatContactComponent />
//         {/* chat section */}
//         {text ? <MainChatComponent /> : <EmptyChatComponent />}
//       </div>
//     </div>
//   );
// }

// export default Chat;
