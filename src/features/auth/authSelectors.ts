import type { RootState } from "../../app/store";

export const selectAuth = (state: RootState) => state.auth;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
    Boolean(state.auth.user && state.auth.token);
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectAuthMessage = (state: RootState) => state.auth.message;
export const selectPasswordReset = (state: RootState) => state.auth.passwordReset;
export const selectPasswordResetStatus = (state: RootState) =>
    state.auth.passwordResetStatus;
