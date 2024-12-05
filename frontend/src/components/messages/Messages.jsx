import { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeleton/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import { Box, CircularProgress, Typography } from "@mui/material";

function Messages() {
  const { messages, loading } = useGetMessages();
  useListenMessages();

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [messages]);

  return (
    <Box className="px-4 overflow-auto flex-1">
      {!loading && messages.length > 0 ? (
        messages.map((message, idx) => (
          <Box
            key={message._id}
            ref={idx === messages.length - 1 ? lastMessageRef : null}
          >
            <Message message={message} />
          </Box>
        ))
      ) : loading ? (
        [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          Please send a message to start the conversation
        </Typography>
      )}

      {loading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}

export default Messages;
