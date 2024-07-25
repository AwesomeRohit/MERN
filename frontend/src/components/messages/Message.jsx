import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser && message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const ProfilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={ProfilePic} alt="Profile" />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
    </div>
  );
}

export default Message;


// import React from 'react';
// import { useAuthContext } from '../../context/AuthContext';
// import useConversation from '../../zustand/useConversation';

// function Message({ message }) {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useConversation();

//   console.log('authUser:', authUser); // Debugging authUser
//   console.log('message.senderId:', message.senderId); // Debugging senderId
//   const fromMe = authUser && message.senderId === authUser._id;
//   console.log('fromMe:', fromMe); // Debugging fromMe condition

//   const chatClassName = fromMe ? "chat-end" : "chat-start";
//   const ProfilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
//   const bubbleBgColor = fromMe ? "bg-blue-500" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className='chat-image avatar'>
//         <div className='w-10 rounded-full'>
//           <img src={ProfilePic} alt="Profile" />
//         </div>
//       </div>
//       <div className={`chat-bubble text-white ${bubbleBgColor}`}>{message.message}</div>
//       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>12:42</div>
//     </div>
//   );
// }

// export default Message;
