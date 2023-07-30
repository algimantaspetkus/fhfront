import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUser } from "../hooks/useGetUser";
import React from "react";
import AppBar from "../components/AppBar";
import Box from "@mui/material/Box";

import SignIn from "./SignIn";
import ProfileSettings from "./ProfileSettings";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import TaskLists from "./TaskLists";
import ShoppingLists from "./ShoppingLists";
import GroupSettings from "./GroupsSettings";
import Tasks from "./Tasks";
import ShoppingItems from "./ShoppingItems";
import Calendar from "./Calendar";

export default function MainLayout() {
  const { getUser } = useGetUser();
  const defaultGroupId = useSelector(
    (state) => state.userSettings.defaultGroupId
  );
  const userId = useSelector((state) => state.userSettings.userId);

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (jwt) {
      getUser();
    }

    if (!jwt && currentPath !== "/signin/") {
      window.location.replace("/signin/");
    } else if (jwt && currentPath === "/signin/") {
      window.location.replace("/");
    } else if (jwt && currentPath !== "/group" && !defaultGroupId) {
      window.location.replace("/group");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        {userId ? (
          <header>
            <AppBar />
          </header>
        ) : null}
        <Box component={"main"}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasklists" element={<TaskLists />} exact />
            <Route path="/shoppinglists" element={<ShoppingLists />} exact />
            <Route path="/tasklists/:itemListId/tasks" element={<Tasks />} />
            <Route
              path="/shoppinglists/:itemListId/shoppingitems"
              element={<ShoppingItems />}
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/group" element={<GroupSettings />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}
