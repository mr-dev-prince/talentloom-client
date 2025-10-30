import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./feature/modal/modalSlice";
import userReducer from "./feature/user/userSlice";
import discussionReducer from "./feature/discussion/discussionSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    discussion: discussionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
