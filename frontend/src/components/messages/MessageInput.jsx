import React, { useState } from "react";
import { Box, TextField, IconButton, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useSendMessage from "../../hooks/useSendMessage";

function MessageInput() {
  const [message, setMessage] = useState("");
  const { loading, sendMessage } = useSendMessage();

  const handleInput = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleInput}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        padding: 2,
        borderRadius: 1,
        backgroundColor: "grey.800",
      }}
    >
      {/* Message Input */}
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        fullWidth
        placeholder="Type your message"
        sx={{
          marginRight: 2,
          input: {
            color: "white",
          },
          fieldset: {
            borderColor: "white", // Customize border color
          },
        }}
      />

      {/* Send Button */}
      <IconButton
        type="submit"
        color="primary"
        sx={{ marginLeft: 1 }}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress size={24} color="primary" />
        ) : (
          <SendIcon />
        )}
      </IconButton>
    </Box>
  );
}

export default MessageInput;
