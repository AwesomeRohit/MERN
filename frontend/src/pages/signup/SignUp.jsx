import React, { useState } from "react";
import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import useSignUp from "../../hooks/useSignUp";
import LoadingBar from "react-top-loading-bar";
import { TextField, Button, Box, Typography, Container, Grid, Link as MuiLink } from "@mui/material";

function SignUp() {
  const [progress, setProgress] = useState(0);
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignUp();

  const handleGenderCheckBox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(inputs);
    } catch (error) {
      console.error("Error during signup: ", error);
    }
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
        <Typography variant="h4" align="center" sx={{ color: "white", marginBottom: 2 }}>
          SignUp <span style={{ color: "#2196f3" }}>ChatApp</span>
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
              sx={{ backgroundColor: "white", borderRadius: 1 }}
            />
          </Box>

          <GenderCheckBox onCheckBoxChange={handleGenderCheckBox} selectedGender={inputs.gender} />

          <MuiLink component={Link} to="/login" sx={{ display: "block", textAlign: "center", marginBottom: 2, color: "white" }}>
            Already have an account? Login instead
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
            {loading ? <span className="loading loading-spinner"></span> : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default SignUp;
