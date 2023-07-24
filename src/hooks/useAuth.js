import { useState } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import {
  setToken,
  setUserId,
  setDisplayName,
  setAvatar,
  setDefaultGroupId,
} from "../redux/userSettingsSlice";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const dispatch = useDispatch();

  const server = process.env.REACT_APP_BASE_SERVER;

  async function signIn(email, password) {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post(`${server}/auth/login`, {
        email,
        password,
      });
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setStatus("error");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
        dispatch(setToken(data.token));
        dispatch(setUserId(data.userId));
        dispatch(setDisplayName(data.displayName));
        dispatch(setAvatar(data.avatar));
        dispatch(setDefaultGroupId(data.defaultGroupId));
        setStatus("success");
        if (!data.defaultGroupId && window.location.pathname !== "/group") {
          window.location.href = "/group";
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function signUp(email, displayName, password) {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.post(`${server}/auth/signup`, {
        email,
        displayName,
        password,
      });
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setStatus("error");
      }
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setError("Registration failed");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }
  return { loading, status, error, signIn, signUp };
}
