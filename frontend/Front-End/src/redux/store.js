import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { postReducer } from "./slices/postSlice";
import { commentReducer } from "./slices/commentSlice";
import { categoryReducer } from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    post: postReducer,
    comment: commentReducer,
    category: categoryReducer,
  },
});

export { store };
