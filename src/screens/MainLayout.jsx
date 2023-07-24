import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import React from "react";
import AppBar from "../components/AppBar";
import Box from "@mui/material/Box";

import Login from "./Login";
import Register from "./Register";
import DashboardPage from "./DashboardPage";
import TaskListsPage from "./TaskListsPage";
import GroupPage from "./GroupPage";
import TasksPage from "./TasksPage";

export default function MainLayout() {
  const { getUser } = useGetUser();

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
    } else if (
      jwt &&
      currentPath !== "/group" &&
      !localStorage.getItem("defaultGroupId")
    ) {
      window.location.replace("/group");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        {window.location.pathname !== "/login/" ? (
          <header>
            <AppBar />
          </header>
        ) : null}
        <Box component={"main"}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasklists" element={<TaskListsPage />} exact />
            <Route
              path="/tasklists/:taskListId/tasks"
              element={<TasksPage />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/group" element={<GroupPage />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}
