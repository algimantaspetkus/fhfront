import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import api from "../api";
import { useSnackbarMessage } from "./useSnackbarMessage";

export function useUserGroups() {
  const { sendMessage } = useSnackbarMessage();
  const server = process.env.REACT_APP_BASE_SERVER;
  const userId = useSelector((state) => state.userSettings.userId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [groups, setGroups] = useState(null);

  const getUserGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await api(`${server}/api/group/getgroups`);
      if (!response.data) {
        sendMessage("Failed to get groups", "error");
      }
      setGroups(response.data.groups);
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get groups",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [server, sendMessage]);

  useEffect(() => {
    getUserGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, userId]);

  return { loading, status, error, getUserGroups, groups };
}
