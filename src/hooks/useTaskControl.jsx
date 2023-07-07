import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";

export function useTaskControl() {
  const defaultFamilyId = localStorage.getItem("defaultFamilyId");
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTaskList = useCallback(async () => {
    try {
      const response = await fetch(`${server}/tasks/gettasklists`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user task list");
      }
      const data = await response.json();
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
      query: { room: defaultFamilyId },
    });

    socket.on("updateTaskList", () => {
      getTaskList();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, defaultFamilyId, getTaskList]);

  return { loading, status, error, getTaskList, taskLists };
}
