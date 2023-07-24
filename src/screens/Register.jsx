import React, { useState, useRef, useEffect, useCallback } from "react";
import { TextField, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const server = process.env.REACT_APP_BASE_SERVER;

export default function Login() {
  const [email, setEmail] = useState("");
  const [displayName, setDispllayName] = useState("");
  const [password, setPassword] = useState("");

  const pwd = useRef(null);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { loading, error, status, signUp } = useAuth();
  const navigate = useNavigate();

  const handleLoginSuccess = useCallback(() => {
    enqueueSnackbar("Registered succesfully", {
      variant: "success",
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <CloseIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      ),
    });
    navigate("/login");
  }, [closeSnackbar, navigate, enqueueSnackbar]);

  const handleLoginError = useCallback(() => {
    enqueueSnackbar(error, {
      variant: "error",
      action: (key) => (
        <IconButton onClick={() => closeSnackbar(key)} size="small">
          <CloseIcon sx={{ color: "#ffffff" }} />
        </IconButton>
      ),
    });
    setPassword("");
  }, [enqueueSnackbar, error, closeSnackbar]);

  useEffect(() => {
    if (status === "success") {
      handleLoginSuccess();
    }
    if (status === "error") {
      handleLoginError();
    }
  }, [status, handleLoginSuccess, handleLoginError]);

  const singUpHandler = useCallback(
    (event) => {
      event.preventDefault();
      signUp(email, displayName, password);
    },
    [email, password, displayName, signUp]
  );

  console.log(`url(${server}/images/background.jpg)`);

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

      <Box
        component="form"
        onSubmit={singUpHandler}
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
        <Typography variant="h4">Register</Typography>
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
          value={displayName}
          onChange={(e) => setDispllayName(e.target.value)}
          label="Display Name"
          variant="outlined"
          sx={{ width: "100%" }}
          type="text"
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
        <Typography
          variant="p"
          sx={{ fontSize: "12px", margin: 0, padding: 0 }}
        >
          Already have an account? Click{" "}
          <Typography
            variant="span"
            sx={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/login")}
          >
            here
          </Typography>{" "}
          to sign in.
        </Typography>
      </Box>
    </Box>
  );
}
