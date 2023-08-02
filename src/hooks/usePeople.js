import { useState, useEffect, useCallback } from "react";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

const server = process.env.REACT_APP_BASE_SERVER;

export function usePeople(itemListId) {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const { sendMessage } = useSnackbarMessage();

  const getByListId = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(
        `${server}/api/group/listmembers/${itemListId}`
      );
      if (!response.data) {
        sendMessage("Error fetching people", "error");
      }
      setPeople(response.data.members);
    } catch (error) {
      sendMessage(error?.response?.data?.error || "Error fetching people");
    } finally {
      setLoading(false);
    }
  }, [itemListId, sendMessage]);

  useEffect(() => {
    if (itemListId) {
      getByListId();
    }
  }, [itemListId, getByListId]);

  return { people, getByListId, loading };
}
