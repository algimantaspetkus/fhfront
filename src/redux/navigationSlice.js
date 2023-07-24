import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appBarTitle: "Dashboard",
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.appBarTitle = action.payload;
    },
  },
});

export const { setTitle } = navigationSlice.actions;
export default navigationSlice.reducer;
