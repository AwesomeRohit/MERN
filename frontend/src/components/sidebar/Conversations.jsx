import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import { Container, Divider, CircularProgress, Typography } from "@mui/material";

function Conversations() {
  const { loading, conversations } = useGetConversations();

  return (
    <Container
      maxWidth={false} // Ensures it takes the full width of the screen
      sx={{
        display: "flex",
        flexDirection: "column",
        py: 2,
        overflowY: "auto", // Makes the container scrollable
        height: "100vh", // Ensures it takes the full height of the viewport
        backgroundColor: "grey.900", // Dark grey background
        borderRadius: 1, // Optional rounded corners
        boxShadow: 1, // Optional: adds shadow for depth
      }}
    >
      {/* Conversations */}
      {conversations.map((conversation, idx) => (
        <React.Fragment key={conversation._id}>
          <Conversation
            conversation={conversation}
            lastIdx={idx === conversations.length - 1}
          />
          {idx !== conversations.length - 1 && (
            <Divider sx={{ my: 1 }} /> // Divider between conversations
          )}
        </React.Fragment>
      ))}

      {/* Loading Spinner */}
      {loading && (
        <Container
          maxWidth={false} // Takes full width
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90%", // Takes full height available
            py: 1,
          }}
        >
          <CircularProgress color="primary" />
        </Container>
      )}

      {/* Message when no conversations are loaded */}
      {!loading && conversations.length === 0 && (
        <Typography
          variant="body2"
          sx={{ textAlign: "center", color: "grey.600" }}
        >
          No conversations available.
        </Typography>
      )}
    </Container>
  );
}

export default Conversations;
