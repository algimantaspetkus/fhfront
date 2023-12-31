import { useReducer, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

const initialState = {
  taskTitle: "",
  taskDescription: "",
  assignedToUser: "",
  dueBy: "",
  priority: "",
  items: [],
  itemList: {},
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_TASK_TITLE":
      return {
        ...state,
        taskTitle: action.payload,
      };
    case "SET_TASK_DESCRIPTION":
      return {
        ...state,
        taskDescription: action.payload,
      };
    case "SET_ASSIGNED_TO_USER":
      return {
        ...state,
        assignedToUser: action.payload,
      };
    case "SET_DUE_BY":
      return {
        ...state,
        dueBy: action.payload,
      };
    case "SET_PRIORITY":
      return {
        ...state,
        priority: action.payload,
      };
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "SET_ITEM_LIST":
      return {
        ...state,
        itemList: action.payload,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}

const server = process.env.REACT_APP_BASE_SERVER;

export function useTaskItems(itemListId) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sendMessage } = useSnackbarMessage();

  const getItems = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`${server}/api/task/tasks/${itemListId}`);
      if (!response.data) {
        sendMessage("Failed to get tasks", "error");
      }
      const data = response.data;
      dispatch({ type: "SET_ITEMS", payload: data.tasks });
      dispatch({ type: "SET_ITEM_LIST", payload: data.itemList });
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get tasks",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [itemListId, sendMessage]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    const socket = io(server, {
      query: { room: itemListId },
    });

    socket.on("updateTaskItem", () => {
      getItems();
    });

    return () => {
      socket.disconnect();
    };
  }, [getItems, itemListId]);

  function setItemData(type, payload) {
    switch (type) {
      case "taskTitle":
        dispatch({ type: "SET_TASK_TITLE", payload: payload });
        break;
      case "taskDescription":
        dispatch({ type: "SET_TASK_DESCRIPTION", payload: payload });
        break;
      case "assignedToUser":
        dispatch({ type: "SET_ASSIGNED_TO_USER", payload: payload });
        break;
      case "dueBy":
        dispatch({ type: "SET_DUE_BY", payload: payload });
        break;
      case "priority":
        dispatch({ type: "SET_PRIORITY", payload: payload });
        break;
      default:
        break;
    }
  }

  async function createItem(event, callback) {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        itemListId: itemListId,
        taskTitle: state.taskTitle !== "" ? state.taskTitle : undefined,
        taskDescription:
          state.taskDescription !== "" ? state.taskDescription : undefined,
        assignedToUser:
          state.assignedToUser !== "" ? state.assignedToUser : undefined,
        dueBy: state.dueBy !== "" ? state.dueBy : undefined,
        priority: state.priority !== "" ? state.priority : undefined,
      };

      const response = await api.post(
        `${server}/api/task/addtask`,
        requestBody
      );

      if (!response?.data) {
        sendMessage("Failed to create task", "error");
      }
      sendMessage("Task created", "success");
      callback();
      resetState();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create task",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function toggleComplete(taskId, payLoad) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        taskId: taskId,
        data: {
          completed: payLoad,
        },
      };
      await api.put(`${server}/api/task/update`, requestBody);
      getItems();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to update task",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function deleteItem(taskId) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await api.delete(`${server}/api/task/${taskId}`);
      sendMessage("Task deleted", "success");
      getItems();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete task",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function getItem(taskId) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`${server}/api/task/${taskId}`);
      if (!response.data) {
        return null;
      }
      return response.data;
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get task",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  function resetState() {
    dispatch({ type: "SET_TASK_TITLE", payload: "" });
    dispatch({ type: "SET_TASK_DESCRIPTION", payload: "" });
    dispatch({ type: "SET_ASSIGNED_TO_USER", payload: "" });
    dispatch({ type: "SET_DUE_BY", payload: "" });
    dispatch({ type: "SET_PRIORITY", payload: "" });
  }

  return {
    state,
    getItem,
    getItems,
    setItemData,
    createItem,
    toggleComplete,
    deleteItem,
  };
}
