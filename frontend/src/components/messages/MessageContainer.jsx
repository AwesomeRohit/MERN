import React, { useEffect } from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import useConversation from "../../zustand/useConversation";
import { Box, Typography, Divider } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();

  // Cleanup function
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <Box
      sx={{
        width: "100%", // Ensures it takes full width of the parent container
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh", // Ensures the container stretches to fill the available height
      }}
    >
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "grey.800",
              padding: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="textSecondary">
              To:{" "}
            </Typography>
            <Typography variant="h6" sx={{ marginLeft: 0, color: "black" }}>
              {selectedConversation.fullName}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Messages />
          <MessageInput />
        </>
      )}
    </Box>
  );
}

export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100%",
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Welcome {authUser.username}
      </Typography>
      <Typography variant="body1">Select a chat to start messaging</Typography>
    </Box>
  );
};
