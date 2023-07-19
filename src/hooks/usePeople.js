import { useState, useEffect, useCallback } from "react";
import api from "../api";

export function usePeople(taskListId) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  const getByTaskList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${server}/family/getListMembers/${taskListId}`
      );
      if (!response.data) {
        setError("Error fetching people");
        setStatus("error");
      }
      setPeople(response.data.members);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setError("Error fetching people");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }, [taskListId, server]);

  useEffect(() => {
    if (taskListId) {
      getByTaskList();
    }
  }, [taskListId, getByTaskList]);

  return { people, getByTaskList, loading, error, status };
}
