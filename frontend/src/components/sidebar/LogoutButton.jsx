import React, { useState } from "react";
import { Button, CircularProgress, Box } from "@mui/material";
import LoadingBar from "react-top-loading-bar";
import useLogout from "../../context/useLogout";

function LogoutButton() {
  const [progress, setProgress] = useState(0);
  const { loading, logout } = useLogout();

  return (
    <>
      {/* Loading Bar */}
      <LoadingBar
        color="#ffffff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      
      {/* Logout Button with MUI styling */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", marginTop: "auto" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            logout();
            setProgress(100);
          }}
          disabled={loading}
          sx={{
            borderRadius: "30px", // Rounded corners for the button
            padding: "10px 20px", // Adjust padding
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Logout"}
        </Button>
      </Box>
    </>
  );
}

export default LogoutButton;
