import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "users",
  initialState: {
    user: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});
const { reducer, actions } = user;
export const { addUser } = actions;
export default reducer;
