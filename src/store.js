import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./redux/navigationSlice";
import userSettingsReducer from "./redux/userSettingsSlice";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    userSettings: userSettingsReducer,
  },
});
