import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import api from "../api";
import { useSnackbarMessage } from "./useSnackbarMessage";

export function useItemList(type) {
  const route = type + "list";
  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemListTitle, setItemListTitle] = useState("");
  const [takListIsPrivate, setItemListIsPrivate] = useState(false);
  const { sendMessage } = useSnackbarMessage();

  const server = process.env.REACT_APP_BASE_SERVER;

  const getItemList = useCallback(async () => {
    try {
      const response = await api.get(`${server}/${route}/list`);
      if (!response.data) {
        sendMessage("Failed to get item lists", "error");
      }
      const data = response.data;
      setItemList(data.itemList);
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to make item list public",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [sendMessage, server, route]);

  useEffect(() => {
    getItemList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultGroupId && defaultGroupId !== "notset") {
      const socket = io(server, {
        query: { room: defaultGroupId },
      });

      socket.on(
        `update${type[0].toUpperCase() + type.slice(1, type.length)}List`,
        () => {
          getItemList();
        }
      );
      return () => {
        socket.disconnect();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, defaultGroupId]);

  const setItemListData = (type, payload) => {
    switch (type) {
      case "itemListTitle":
        setItemListTitle(payload);
        break;
      case "itemListIsPrivate":
        setItemListIsPrivate(payload);
        break;
      case "reset":
        setItemListTitle("");
        setItemListIsPrivate(false);
        break;
      default:
        break;
    }
  };

  const makeItemListPublic = async (itemListId) => {
    try {
      const response = await api.put(`${server}/${route}/makepublic`, {
        itemListId,
      });
      if (!response.data) {
        sendMessage("Failed to make list public", "error");
      }
      const data = response.data;
      setItemList(data.itemList);
      sendMessage("List made public", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to make list public",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const disableItemList = async (itemListId) => {
    try {
      const response = await api.put(`${server}/${route}/disable`, {
        itemListId,
      });
      if (!response.data) {
        sendMessage("Failed to delete list", "error");
      }
      const data = response.data;
      setItemList(data.itemList);
      sendMessage("List deleted", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const createItemList = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post(`${server}/${route}/add`, {
        listTitle: itemListTitle,
        isPrivate: takListIsPrivate,
      });
      if (!response.data) {
        sendMessage("Failed to create list", "error");
      } else {
        sendMessage("List created", "success");
        getItemList();
      }
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create list",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getItemList,
    itemList,
    setItemListData,
    createItemList,
    makeItemListPublic,
    disableItemList,
  };
}
