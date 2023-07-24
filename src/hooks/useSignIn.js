import { useState } from "react";
import api from "../api";

export function useSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

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
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("token", data.token);
        localStorage.setItem("displayName", data.displayName);
        localStorage.setItem("avatar", data.avatar);
        setStatus("success");
        if (data.defaultGroupId) {
          localStorage.setItem("defaultGroupId", data.defaultGroupId);
        } else {
          localStorage.removeItem("defaultGroupId");
          window.location.href = "/groupsettings";
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
        password,
      });
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setStatus("error");
      }
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }
  return { loading, status, error, signIn, signUp };
}
