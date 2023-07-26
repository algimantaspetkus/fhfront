import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import api from "../api";
import { useSnackbarMessage } from "./useSnackbarMessage";

export function useItemList() {
  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [taskListTitle, setTaskListTitle] = useState("");
  const [takListIsPrivate, setTaskListIsPrivate] = useState(false);
  const { sendMessage } = useSnackbarMessage();

  const server = process.env.REACT_APP_BASE_SERVER;

  const getTaskList = useCallback(async () => {
    try {
      const response = await api.get(`${server}/tasklist/gettasklists`);
      if (!response.data) {
        sendMessage("Failed to get task lists", "error");
      }
      const data = response.data;
      setItemList(data.itemList);
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to make task list public",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [sendMessage, server]);

  useEffect(() => {
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const socket = io(server, {
      query: { room: defaultGroupId },
    });

    socket.on("updateTaskList", () => {
      getTaskList();
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, defaultGroupId]);

  const setTaskListData = (type, payload) => {
    switch (type) {
      case "taskListTitle":
        setTaskListTitle(payload);
        break;
      case "taskListIsPrivate":
        setTaskListIsPrivate(payload);
        break;
      case "reset":
        setTaskListTitle("");
        setTaskListIsPrivate(false);
        break;
      default:
        break;
    }
  };

  const makeTaskListPublic = async (itemListId) => {
    try {
      const response = await api.put(`${server}/tasklist/makepublic`, {
        itemListId,
      });
      if (!response.data) {
        sendMessage("Failed to make task list public", "error");
      }
      const data = response.data;
      setItemList(data.taskList);
      sendMessage("Task List made public", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to make task list public",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const disableTaskList = async (itemListId) => {
    try {
      const response = await api.put(`${server}/tasklist/disabletasklist`, {
        itemListId,
      });
      if (!response.data) {
        sendMessage("Failed to delete task list", "error");
      }
      const data = response.data;
      setItemList(data.taskList);
      sendMessage("Task List deleted", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete task list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const createTaskList = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/tasklist/addtasklist`, {
        listTitle: taskListTitle,
        isPrivate: takListIsPrivate,
      });
      if (!response.data) {
        sendMessage("Failed to create task list", "error");
      } else {
        sendMessage("Task List created", "success");
        getTaskList();
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create task list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getTaskList,
    itemList,
    setTaskListData,
    createTaskList,
    makeTaskListPublic,
    disableTaskList,
  };
}
