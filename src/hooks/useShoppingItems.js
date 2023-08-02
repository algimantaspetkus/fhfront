import { useReducer, useEffect, useCallback } from "react";
import io from "socket.io-client";
import { useSnackbarMessage } from "./useSnackbarMessage";
import api from "../api";

const initialState = {
  itemTitle: "",
  itemDescription: "",
  itemType: "",
  itemRequired: "",
  itemUrl: "",
  itemQuantity: "",
  items: [],
  itemList: {},
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_ITEM_TITLE":
      return {
        ...state,
        itemTitle: action.payload,
      };
    case "SET_ITEM_DESCRIPTION":
      return {
        ...state,
        itemDescription: action.payload,
      };
    case "SET_ITEM_TYPE":
      return {
        ...state,
        itemType: action.payload,
      };
    case "SET_ITEM_URL":
      return {
        ...state,
        itemUrl: action.payload,
      };
    case "SET_ITEM_QUANTITY":
      return {
        ...state,
        itemQuantity: action.payload,
      };
    case "SET_ITEM_REQUIRED":
      return {
        ...state,
        itemRequired: action.payload,
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

export function useShoppingItems(itemListId) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sendMessage } = useSnackbarMessage();

  const getItems = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(
        `${server}/api/shoppingitem/items/${itemListId}`
      );
      if (!response.data) {
        sendMessage("Failed to get shopping items", "error");
      }
      const data = response.data;
      dispatch({ type: "SET_ITEMS", payload: data.shoppingItems });
      dispatch({ type: "SET_ITEM_LIST", payload: data.itemList });
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get shopping items",
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

    socket.on("updateShoppingItem", () => {
      getItems();
    });

    return () => {
      socket.disconnect();
    };
  }, [getItems, itemListId]);

  function setItemData(type, payload) {
    switch (type) {
      case "itemTitle":
        dispatch({ type: "SET_ITEM_TITLE", payload: payload });
        break;
      case "itemDescription":
        dispatch({ type: "SET_ITEM_DESCRIPTION", payload: payload });
        break;
      case "itemType":
        dispatch({ type: "SET_ITEM_TYPE", payload: payload });
        break;
      case "itemRequired":
        dispatch({ type: "SET_ITEM_REQUIRED", payload: payload });
        break;
      case "itemUrl":
        dispatch({ type: "SET_ITEM_URL", payload: payload });
        break;
      case "itemQuantity":
        dispatch({ type: "SET_ITEM_QUANTITY", payload: payload });
        break;
      default:
        break;
    }
  }

  async function createItem(event) {
    event.preventDefault();
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        itemListId: itemListId,
        itemTitle: state.itemTitle !== "" ? state.itemTitle : undefined,
        itemDescription:
          state.itemDescription !== "" ? state.itemDescription : undefined,
        type: state.itemType !== "" ? state.itemType : undefined,
        required: state.itemRequired !== "" ? state.itemRequired : undefined,
        url: state.itemUrl !== "" ? state.itemUrl : undefined,
        quantity: state.itemQuantity !== "" ? state.itemQuantity : undefined,
      };

      const response = await api.post(
        `${server}/api/shoppingitem/additem`,
        requestBody
      );

      if (!response?.data) {
        sendMessage("Failed to create shopping item", "error");
      }
      sendMessage("Shopping Item created", "success");
      resetState();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create shopping item",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function toggleComplete(shoppingItemId, payLoad) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const requestBody = {
        shoppingItemId,
        data: {
          completed: payLoad,
        },
      };
      await api.put(`${server}/api/shoppingitem/update`, requestBody);
      getItems();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to update item",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function deleteItem(itemId) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await api.delete(`${server}/api/shoppingitem/${itemId}`);
      sendMessage("Item deleted", "success");
      getItems();
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete item",
        "error"
      );
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  async function getItem(itemId) {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await api.get(`${server}/api/shoppingitem/${itemId}`);
      if (!response.data) {
        return null;
      }
      return response.data;
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get shopping item",
        "error"
      );
      return null;
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  function resetState() {
    dispatch({ type: "SET_ITEM_TITLE", payload: "" });
    dispatch({ type: "SET_ITEM_DESCRIPTION", payload: "" });
    dispatch({ type: "SET_ITEM_TYPE", payload: "" });
    dispatch({ type: "SET_ITEM_REQUIRED", payload: "" });
    dispatch({ type: "SET_ITEM_URL", payload: "" });
    dispatch({ type: "SET_ITEM_QUANTITY", payload: "" });
  }

  return {
    state,
    getItems,
    setItemData,
    createItem,
    toggleComplete,
    deleteItem,
    getItem,
  };
}
