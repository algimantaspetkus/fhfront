import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appBarTitle: "Dashboard",
  appBarKey: 0,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.appBarTitle = action.payload;
    },
    incrementKey: (state) => {
      state.appBarKey += 1;
    },
  },
});

export const { setTitle, incrementKey } = navigationSlice.actions;
export default navigationSlice.reducer;
