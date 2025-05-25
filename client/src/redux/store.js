import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";

const appStore = configureStore({
  reducer: {
    cart: notesReducer,
  },
});

export default appStore;