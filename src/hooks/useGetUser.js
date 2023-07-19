import { useState } from "react";
import api from "../api";

export function useGetUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  async function getUser() {
    setError(null);
    setStatus(null);
    setLoading(true);
    try {
      const response = await api.get(`${server}/user/check`);
      const data = response.data;
      if (data.error) {
        setError(data.error);
        setStatus("error");
      }
      if (!data.error) {
        localStorage.setItem("displayName", data.displayName);
        localStorage.setItem("avatar", data.avatar);
        setStatus("success");
        if (data.defaultFamilyId) {
          localStorage.setItem("defaultFamilyId", data.defaultFamilyId);
        } else {
          localStorage.removeItem("defaultFamilyId");
          if (window.location.pathname !== "/family") {
            window.location.href = "/family";
          }
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("displayName");
        localStorage.removeItem("avatar");
        localStorage.removeItem("defaultFamilyId");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return { loading, status, error, getUser };
}
