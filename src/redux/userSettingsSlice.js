import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  userId: "",
  displayName: "",
  avatar: "",
  defaultGroupId: "notset",
};

const userReducer = createSlice({
  name: "userSettings",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    setDefaultGroupId: (state, action) => {
      state.defaultGroupId = action.payload;
    },
    resetState: (state) => {
      state.token = "";
      state.userId = "";
      state.displayName = "";
      state.avatar = "";
      state.defaultGroupId = "";
    },
  },
});

export const {
  setToken,
  setUserId,
  setDisplayName,
  setAvatar,
  setDefaultGroupId,
  resetState,
} = userReducer.actions;
export default userReducer.reducer;
