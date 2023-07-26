import { useState, useCallback } from "react";
import { TextField, Box, Typography } from "@mui/material";
import PasswordInput from "../components/Inputs/PasswordInput";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const server = process.env.REACT_APP_BASE_SERVER;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, signIn, passwordRef } = useAuth();
  const navigate = useNavigate();

  const signInHandler = (event) => {
    event.preventDefault();
    const passwordRef = event.target.querySelector("#Password");
    signIn(email, password, navigate, passwordRef);
  };

  function setPasswordHandler(_, value) {
    setPassword(value);
  }

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${server}/images/background.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
          zIndex: -1,
        }}
      ></div>

      {/* Login Form */}
      <Box
        component="form"
        onSubmit={signInHandler}
        sx={{
          boxSizing: "border-box",
          width: "90%",
          maxWidth: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          padding: "1rem",
          borderRadius: "10px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          "@media (min-width: 768px)": {
            width: "500px",
            padding: "5rem",
          },
        }}
      >
        <Typography variant="h4">Login</Typography>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          variant="outlined"
          sx={{ width: "100%" }}
          type="email"
          required
        />
        <PasswordInput
          label="Password"
          inputRef={passwordRef}
          fullWidth
          onChange={setPasswordHandler}
        />
        <LoadingButton
          disabled={loading || !email || !password}
          type="submit"
          loading={loading}
          variant="outlined"
        >
          Login
        </LoadingButton>
        <Typography
          variant="p"
          sx={{ fontSize: "12px", margin: 0, padding: 0 }}
        >
          Do not have an account? Click{" "}
          <Typography
            variant="span"
            sx={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/register")}
          >
            here
          </Typography>{" "}
          to register.
        </Typography>
      </Box>
    </Box>
  );
}
