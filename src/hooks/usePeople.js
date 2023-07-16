import { useState, useEffect, useCallback } from "react";

export function usePeople(taskListId) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);

  const server = process.env.REACT_APP_BASE_SERVER;

  const getByTaskList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${server}/family/getListMembers/${taskListId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPeople(data.members);
        setStatus("success");
      } else {
        setError(data.error || "Error fetching people");
        setStatus("error");
      }
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
