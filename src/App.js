import React from "react";
import { SnackbarProvider } from "notistack";

// Components for different pages
import MainLayout from "./screens/MainLayout";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <MainLayout />
    </SnackbarProvider>
  );
}

export default App;
