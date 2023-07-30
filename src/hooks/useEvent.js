import { useState, useEffect } from "react";
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

const server = process.env.REACT_APP_BASE_SERVER;

export function useEvent() {
  const { sendMessage } = useSnackbarMessage();
  const [items, setItems] = useState([]);
  const [icon, setIcon] = useState("fa fa-calendar");
  const [title, setTitle] = useState("Test title");
  const [description, setDescription] = useState("Test");
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);

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

  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server, defaultGroupId]);

  async function addItem(event) {
    event.preventDefault();
    setLoading(true);
    try {
      await api.post(`${server}/api/eventitem/additem`, {
        eventTitle: title,
        eventDescription: description,
        eventDate: date,
        type: icon,
      });
      sendMessage("Event item created", "success");
    } catch (error) {
      sendMessage(
        error?.response?.data?.error || "Failed to create an event item",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  async function getItems() {
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
