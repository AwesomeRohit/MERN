import React from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

function Conversation({ conversation, lastIdx }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: 1,
          bgcolor: isSelected ? "skyblue" : "transparent",
          "&:hover": {
            bgcolor: "skyblue",
          },
        }}
        onClick={() => setSelectedConversation(conversation)}
      >
        <Avatar
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          alt={conversation.username}
          sx={{
            width: 40,
            height: 40,
            border: isOnline ? "2px solid green" : "2px solid transparent",
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
              {conversation.username}
            </Typography>
            <Typography variant="body2" sx={{ color: "white" }}>
              Last Message
            </Typography>
          </Box>
        </Box>
      </Box>

      {!lastIdx && (
        <Divider sx={{ margin: 0, borderColor: "rgba(255, 255, 255, 0.2)" }} />
      )}
    </>
  );
}

export default Conversation;
