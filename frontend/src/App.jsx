import React, { useState } from "react";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/home";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingBar from "react-top-loading-bar";
import { useAuthContext } from "./context/AuthContext";
import { Box } from "@mui/material";

function App() {
  const [progress, setProgress] = useState(100);
  const { authUser } = useAuthContext();

  return (
    <>
      {/* Loading Bar */}
      <LoadingBar
        color="#ffffff"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {/* Main Container */}
      <Box
        sx={{
          height: "100vh", // Full screen height
          display: "flex",
          justifyContent: "center", // Centers content horizontally
          alignItems: "center", // Centers content vertically
          padding: 2, // Adds some padding around the edges
          backgroundColor: "grey.900", // Default background color
        }}
      >
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignUp />} />
        </Routes>
      </Box>

      {/* Toaster Notifications */}
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
