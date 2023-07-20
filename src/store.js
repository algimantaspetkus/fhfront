import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./redux/navigationSlice";

export default configureStore({
  reducer: {
    navigation: navigationReducer,
  },
});
