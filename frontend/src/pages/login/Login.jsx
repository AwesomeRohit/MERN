import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import LoadingBar from "react-top-loading-bar";
import { TextField, Button, Box, Typography, Container, Grid, Link as MuiLink } from "@mui/material";

const Login = () => {
  const [progress, setProgress] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <Container maxWidth="xs">
      <LoadingBar color="#ffffff" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" sx={{ color: "grey", marginBottom: 2 }}>
          Login <span style={{ color: "#2196f3" }}>ChatApp</span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ backgroundColor: "grey", borderRadius: 1 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: "grey", borderRadius: 1 }}
            />
          </Box>
          <MuiLink component={Link} to="/signup" sx={{ display: "block", textAlign: "center", marginBottom: 2, color: "white" }}>
            Don't have an account? Sign up
          </MuiLink>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#2196f3",
              color: "white",
              padding: "12px",
              borderRadius: 1,
              "&:hover": {
                backgroundColor: "#1976d2",
              },
            }}
            disabled={loading}
            onClick={() => setProgress(100)}
          >
            {loading ? <span className="loading loading-spinner"></span> : "Login"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
