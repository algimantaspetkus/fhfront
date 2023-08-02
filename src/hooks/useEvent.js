import { useState, useEffect, useCallback } from "react";
import { useSnackbarMessage } from "./useSnackbarMessage";
import { useSelector } from "react-redux";
import api from "../api";
import io from "socket.io-client";
import {
  faCakeCandles,
  faGift,
  faStethoscope,
  faCompass,
  faGraduationCap,
  faChampagneGlasses,
  faPaw,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const iconArray = [
  {
    icon: faCakeCandles,
    text: "birthday",
  },
  {
    icon: faGift,
    text: "gift",
  },
  {
    icon: faStethoscope,
    text: "medical",
  },
  {
    icon: faCompass,
    text: "travel",
  },
  {
    icon: faGraduationCap,
    text: "graduation",
  },
  {
    icon: faChampagneGlasses,
    text: "party",
  },
  {
    icon: faPaw,
    text: "pet",
  },
  {
    icon: faUtensils,
    text: "food",
  },
];

const server = process.env.REACT_APP_BASE_SERVER;

export function useEvent() {
  const { sendMessage } = useSnackbarMessage();
  const [items, setItems] = useState([]);
  const [icon, setIcon] = useState(undefined);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );

  const getItems = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(`${server}/api/eventitem/getitems`);
      setItems(response.data);
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to get event items",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [setLoading, setItems, sendMessage]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (defaultGroupId && defaultGroupId !== "notset") {
      const socket = io(server, {
        query: { room: defaultGroupId },
      });

      socket.on(`updateEventItems`, () => {
        getItems();
      });
      return () => {
        socket.disconnect();
      };
    }
  }, [defaultGroupId, getItems]);

  async function addItem(event, callback) {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post(`${server}/api/eventitem/additem`, {
        eventTitle: title,
        eventDescription: description ? description : undefined,
        eventDate: date,
        type: icon,
      });
      resetState();
      callback();
      sendMessage("Event item created", "success");
    } catch (error) {
      if (!date) {
        sendMessage("Please select a date", "error");
        return;
      }
      sendMessage(
        error?.response?.data?.error || "Failed to create an event item",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function deleteItem(id) {
    setLoading(true);
    try {
      await api.delete(`${server}/api/eventitem/deleteitem/${id}`);
      sendMessage("Item deleted", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to delete event item",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  function setItemData(type, value) {
    switch (type) {
      case "itemTitle":
        setTitle(value);
        break;
      case "itemDescription":
        setDescription(value);
        break;
      case "itemDate":
        setDate(value);
        break;
      case "itemIcon":
        setIcon(value);
        break;
      default:
        break;
    }
  }

  function resetState() {
    setTitle("");
    setDescription("");
    setDate(null);
    setIcon(undefined);
  }

  return {
    addItem,
    setItemData,
    getItems,
    deleteItem,
    items,
    loading,
    iconArray,
  };
}
