import React from "react";
import { SnackbarProvider } from "notistack";
import store from "./store";
import { Provider } from "react-redux";

// Components for different pages
import MainLayout from "./screens/MainLayout";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <div className="logo-container" />
        <MainLayout />
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
