import { useState, useEffect, useCallback } from "react";

export function useTasks(taskListId) {
  const [tasks, setTasks] = useState([]);
  const [taskList, setTaskList] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTasks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${server}/task/tasks/${taskListId}`, {
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
      setTasks(data.tasks);
      setTaskList(data.taskList);
      setStatus("success");
    } catch (error) {
      console.error("Error:", error);
      setError("Authentication error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [taskListId, server]);

  return { tasks, taskList, loading, status, error, getTasks };
}
