import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlide";
const rootReducer = {
  users: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
