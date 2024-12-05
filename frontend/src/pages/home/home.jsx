import React from "react";
import Sidebar from "../../components/sidebar/sidebar";
import MessageContainer from "../../components/messages/MessageContainer";
import { Box,} from "@mui/material";

function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw", // Ensure it takes full width of the viewport
        height: "100vh", // Full height of the viewport
        backgroundColor: "grey.900", // Black background
        overflow: "hidden", // Prevent horizontal or vertical overflow
        padding: 0, // Remove padding
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Divider between Sidebar and MessageContainer */}
      

      {/* Message Container */}
      <MessageContainer />
    </Box>
  );
}

export default Home;
