import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetUser } from "../hooks/useGetUser";
import React from "react";
import AppBar from "../components/AppBar";
import Box from "@mui/material/Box";

import Login from "./Login";
import Profile from "./Profile";
import Register from "./Register";
import DashboardPage from "./DashboardPage";
import TaskListsPage from "./TaskListsPage";
import GroupPage from "./GroupPage";
import TasksPage from "./TasksPage";

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

    if (!jwt && currentPath !== "/login/") {
      window.location.replace("/login/");
    } else if (jwt && currentPath === "/login/") {
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
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasklists" element={<TaskListsPage />} exact />
            <Route
              path="/tasklists/:itemListId/tasks"
              element={<TasksPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/group" element={<GroupPage />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}
