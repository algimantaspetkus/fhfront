import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import api from "../api";
import { IconButton } from "@mui/material";
import { useSnackbar } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

export function useTaskList() {
  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const [taskLists, setTaskLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [taskListTitle, setTaskListTitle] = useState("");
  const [takListIsPrivate, setTaskListIsPrivate] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
      getTaskList();
    });

    return () => {
      socket.disconnect();
    };
  }, [server, defaultGroupId, getTaskList]);

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

  const makeTaskListPublic = async (taskListId) => {
    try {
      const response = await api.put(`${server}/tasklist/makepublic`, {
        taskListId,
      });
      if (!response.data) {
        enqueueSnackbar(
          error?.response?.data?.error || "Failed to make task list public",
          {
            variant: "error",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <CloseIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            ),
          }
        );
      }
      const data = response.data;
      setTaskLists(data.taskList);
      enqueueSnackbar("Task List made public", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.error || "Failed to make task list public",
        {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        }
      );
    } finally {
      setLoading(false);
    }
  };

  const disableTaskList = async (taskListId) => {
    try {
      const response = await api.put(`${server}/tasklist/disabletasklist`, {
        taskListId,
      });
      if (!response.data) {
        enqueueSnackbar(
          error?.response?.data?.error || "Failed to delete task list",
          {
            variant: "error",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <CloseIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            ),
          }
        );
      }
      const data = response.data;
      setTaskLists(data.taskList);
      enqueueSnackbar("Task List deleted", {
        variant: "success",
        action: (key) => (
          <IconButton onClick={() => closeSnackbar(key)} size="small">
            <CloseIcon sx={{ color: "#ffffff" }} />
          </IconButton>
        ),
      });
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.error || "Failed to delete task list",
        {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        }
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
        enqueueSnackbar(
          error?.response?.data?.error || "Failed to create task list",
          {
            variant: "error",
            action: (key) => (
              <IconButton onClick={() => closeSnackbar(key)} size="small">
                <CloseIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            ),
          }
        );
      } else {
        enqueueSnackbar("Task List created", {
          variant: "success",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        });
        getTaskList();
      }
    } catch (error) {
      enqueueSnackbar(
        error?.response?.data?.error || "Failed to create task list",
        {
          variant: "error",
          action: (key) => (
            <IconButton onClick={() => closeSnackbar(key)} size="small">
              <CloseIcon sx={{ color: "#ffffff" }} />
            </IconButton>
          ),
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    status,
    error,
    getTaskList,
    taskLists,
    setTaskListData,
    createTaskList,
    makeTaskListPublic,
    disableTaskList,
  };
}
