import { useState, useCallback } from "react";
import { Box, Typography, Container, SwipeableDrawer } from "@mui/material";
import TaskList from "../components/Lists/TaskList";
import SingleActionFab from "../components/Fab/SingleActionFab";

export default function TasksPage() {
  console.log("TasksPage");
  return (
    <>
      <Container>
        <Box sx={{ marginTop: "5rem" }}>
          <Typography variant="h4" component="h2">
            TaskList page
          </Typography>
        </Box>
      </Container>
    </>
  );
}
