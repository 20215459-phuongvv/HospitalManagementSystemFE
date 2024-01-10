import userReducer from "./features/userSlice";
import loadingReducer from "./features/loadingSlice";
import postReducer from "./features/postSlice";
import departmentSlice from "./features/departmentSlice";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const rootReducers = combineReducers({
  user: userReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
