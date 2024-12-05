import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { Box, Avatar, Typography, Chip } from "@mui/material";

function Message({ message }) {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = authUser && message.senderID === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const ProfilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;
  const bubbleBgColor = fromMe ? "primary.main" : "grey.600"; // MUI theme colors

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: fromMe ? "row-reverse" : "row",
        alignItems: "flex-start",
        mb: 2, // margin bottom between messages
      }}
    >
      {/* Profile Avatar */}
      <Avatar
        alt="Profile"
        src={ProfilePic}
        sx={{ width: 40, height: 40, marginRight: 1, marginLeft: fromMe ? 0 : 1 }}
      />

      {/* Chat Bubble */}
      <Box
        sx={{
          backgroundColor: bubbleBgColor,
          color: "white",
          borderRadius: 2,
          padding: "8px 16px",
          maxWidth: "80%",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body2">{message.message}</Typography>
      </Box>

      {/* Message Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 0.5,
          opacity: 0.7,
          fontSize: "0.75rem",
        }}
      >
        <Chip label="12:42" size="small" sx={{ backgroundColor: "transparent" }} />
      </Box>
    </Box>
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
