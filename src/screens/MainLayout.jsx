import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import React from "react";
import AppBar from "../components/AppBar";
import Box from "@mui/material/Box";

import Login from "./Login";
import DashboardPage from "./DashboardPage";
import TaskListsPage from "./TaskListsPage";
import FamilyPage from "./FamilyPage";
import TaskList from "../components/Lists/TaskList";
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
      currentPath !== "/family" &&
      !localStorage.getItem("defaultFamilyId")
    ) {
      window.location.replace("/family");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Router>
        <header>
          <AppBar />
        </header>
        <Box component={"main"}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/tasklists" element={<TaskListsPage />} exact />
            <Route path="/tasklists/:id" element={<TaskList />} />
            <Route path="/tasklists/:id/tasks" element={<TasksPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/family" element={<FamilyPage />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}
