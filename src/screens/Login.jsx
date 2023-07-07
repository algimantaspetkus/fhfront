import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextField, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../hooks/useSignIn";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const pwd = useRef(null);

  const { enqueueSnackbar } = useSnackbar();
  const { loading, error, status, signIn } = useSignIn();
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => {
    enqueueSnackbar("Login Success", { variant: "success" });
    navigate("/");
  }, [enqueueSnackbar, navigate]);

  const handleLoginError = useCallback(() => {
    enqueueSnackbar(error, { variant: "error" });
    setPassword("");
    pwd.current?.querySelector("input")?.focus();
  }, [enqueueSnackbar, error]);

  useEffect(() => {
    if (status === "success") {
      handleLoginSuccess();
    }
    if (status === "error") {
      handleLoginError();
    }
  }, [status, handleLoginSuccess, handleLoginError]);

  const signInHandler = useCallback(
    (event) => {
      event.preventDefault();
      signIn(email, password);
    },
    [email, password, signIn]
  );

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
          backgroundImage: "url(./background.jpg)",
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
        <TextField
          ref={pwd}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          variant="outlined"
          sx={{ width: "100%" }}
          type="password"
          required
        />
        <LoadingButton
          disabled={loading || !email || !password}
          type="submit"
          loading={loading}
          variant="outlined"
        >
          Login
        </LoadingButton>
      </Box>
    </Box>
  );
}
