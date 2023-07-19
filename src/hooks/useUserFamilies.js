import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import api from "../api";

export function useUserFamilies() {
  const server = process.env.REACT_APP_BASE_SERVER;
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [families, setFamilies] = useState(null);

  const getUserFamilies = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await api(`${server}/family/getfamilies`);
      if (!response.data) {
        throw new Error("Failed to api user families");
      }
      setFamilies(response.data.families);
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [server]);

  useEffect(() => {
    getUserFamilies();
  }, [getUserFamilies]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: userId },
    });

    socket.on("updateFamily", () => {
      getUserFamilies();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, userId, getUserFamilies]);

  return { loading, status, error, getUserFamilies, families };
}
