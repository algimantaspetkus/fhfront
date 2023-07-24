import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import api from "../api";

export function useUserGroups() {
  const server = process.env.REACT_APP_BASE_SERVER;
  const userId = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [groups, setGroups] = useState(null);

  const getUserGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await api(`${server}/group/getgroups`);
      if (!response.data) {
        throw new Error("Failed to api user groups");
      }
      setGroups(response.data.groups);
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
    getUserGroups();
  }, [getUserGroups]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: userId },
    });

    socket.on("updateGroup", () => {
      getUserGroups();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, userId, getUserGroups]);

  return { loading, status, error, getUserGroups, groups };
}
