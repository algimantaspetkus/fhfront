import { useState, useRef } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserId,
  setDisplayName,
  setAvatar,
  setDefaultGroupId,
} from "../redux/userSettingsSlice";
import { useSnackbarMessage } from "./useSnackbarMessage";
import { resetState } from "../redux/userSettingsSlice";

const server = process.env.REACT_APP_BASE_SERVER;

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const { sendMessage } = useSnackbarMessage();

  const dispatch = useDispatch();
  const passwordRef = useRef(null);

  async function signIn(email, password, callBack, pwdRef) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/api/auth/signin`, {
        email,
        password,
      });
      const data = response.data;
      if (data.error) {
        sendMessage(data.error, "error");
        pwdRef.focus();
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(setUserId(data.userId));
        dispatch(setDisplayName(data.displayName));
        dispatch(setAvatar(data.avatar));
        dispatch(setDefaultGroupId(data.defaultGroupId));
        sendMessage("Login successful", "success");
        if (!data.defaultGroupId && window.location.pathname !== "/group") {
          callBack("/group");
        } else {
          callBack("/");
        }
      }
    } catch (error) {
      sendMessage("Login failed", "error");
      pwdRef.focus();
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email, displayName, password, navigate) {
    setLoading(true);
    try {
      const response = await api.post(`${server}/api/auth/signup`, {
        email,
        displayName,
        password,
      });
      const data = response.data;
      if (!data.error) {
        sendMessage("Registration successful", "success");
        navigate("/signin");
      }
      if (data.error) {
        sendMessage(data.error, "error");
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Registration failed",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  function signOut(callBack) {
    localStorage.removeItem("token");
    dispatch(resetState());
    callBack();
  }

  return { loading, signIn, signUp, signOut, passwordRef };
}
