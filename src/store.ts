import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/user";
import fullProfileVisibleReducer from "./features/functions/fullProfileVisible";

export const store = configureStore({
  reducer: {
    user: userReducer,
    fullProfileVisible: fullProfileVisibleReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
