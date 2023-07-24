import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import api from "../api";

export function useTaskList() {
  const defaultGroupId = localStorage.getItem("defaultGroupId");
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTaskList = useCallback(async () => {
    try {
      const response = await api.get(`${server}/tasklist/gettasklists`);
      if (!response.data) {
        throw new Error("Failed to fetch user task list");
      }
      const data = response.data;
      setTaskLists(data.taskList);
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
    getTaskList();
  }, [getTaskList]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: defaultGroupId },
    });

    socket.on("updateTaskList", () => {
      console.log("updateTaskList");
      getTaskList();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, defaultGroupId, getTaskList]);

  return { loading, status, error, getTaskList, taskLists };
}
