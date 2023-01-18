// /* eslint-disable no-undef */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-expressions */

// /* eslint-disable react/button-has-type */
// import React from 'react';
// import ChatInputComponent from './ChatInputComponent';

// function MainChatComponent() {
//   return (
//     <div className="flex flex-col flex-auto h-full p-6">
//       <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
//         <div className="flex flex-col h-full overflow-x-auto mb-4">
//           <div className="flex flex-col h-full">
//             <div ref={scrollRef} className="grid grid-cols-12 gap-y-2">
//               {/* sender chat wrapper */}

//               {message.map((msg) => {
//                 return (
//                   <SingleMessageComponent
//                     message={msg}
//                     chatUserImage={chatUserImage}
//                     currentUserPicture={currentUserPicture}
//                   />
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* chatbox */}
//         <ChatInputComponent handleSendMsg={handleSendMsg} />

//         {/* chatbox ends */}
//       </div>
//     </div>
//   );
// }

// export default MainChatComponent;
