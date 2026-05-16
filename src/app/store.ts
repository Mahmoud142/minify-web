import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import analyticsReducer from "../features/analytics/analyticsSlice";
import urlsReducer from "../features/urls/urlSlice";
import linktreeReducer from "../features/linktree/linktreeSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        analytics: analyticsReducer,
        urls: urlsReducer,
        linktree: linktreeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
