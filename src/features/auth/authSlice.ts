import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../../lib/apiClient";
import { authApi } from "./authApi";
import {
    clearAuthSession,
    getStoredToken,
    getStoredUser,
    persistAuthSession,
} from "./authStorage";
import type {
    ForgotPasswordRequest,
    LoginRequest,
    ResetPasswordRequest,
    SafeUser,
    SignupRequest,
    VerifyResetCodeRequest,
} from "./authTypes";

type AuthRequestStatus = "idle" | "loading" | "succeeded" | "failed";

const storedUser = getStoredUser();
const storedToken = getStoredToken();
const hasValidStoredSession = Boolean(storedUser && storedToken);

if (!hasValidStoredSession) {
    clearAuthSession();
}

interface PasswordResetState {
    email: string | null;
    codeVerified: boolean;
}

interface AuthState {
    user: SafeUser | null;
    token: string | null;
    status: AuthRequestStatus;
    passwordResetStatus: AuthRequestStatus;
    error: string | null;
    message: string | null;
    passwordReset: PasswordResetState;
}

const initialState: AuthState = {
    user: hasValidStoredSession ? storedUser : null,
    token: hasValidStoredSession ? storedToken : null,
    status: "idle",
    passwordResetStatus: "idle",
    error: null,
    message: null,
    passwordReset: {
        email: null,
        codeVerified: false,
    },
};

function getErrorMessage(error: unknown) {
    if (error instanceof ApiError) {
        return error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "Something went wrong. Please try again.";
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async (payload: LoginRequest, { rejectWithValue }) => {
        try {
            const response = await authApi.login(payload);

            if (!response.data?.user || !response.data.token) {
                return rejectWithValue("Login response is missing user or token.");
            }

            return response;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const signupUser = createAsyncThunk(
    "auth/signup",
    async (payload: SignupRequest, { rejectWithValue }) => {
        try {
            const response = await authApi.signup(payload);
            return response;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const requestPasswordReset = createAsyncThunk(
    "auth/requestPasswordReset",
    async (payload: ForgotPasswordRequest, { rejectWithValue }) => {
        try {
            const response = await authApi.forgotPassword(payload);
            return { ...response, email: payload.email };
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const verifyPasswordResetCode = createAsyncThunk(
    "auth/verifyPasswordResetCode",
    async (payload: VerifyResetCodeRequest, { rejectWithValue }) => {
        try {
            const response = await authApi.verifyResetCode(payload);
            return { ...response, email: payload.email, code: payload.code };
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const resetPassword = createAsyncThunk(
    "auth/resetPassword",
    async (payload: ResetPasswordRequest, { rejectWithValue }) => {
        try {
            const response = await authApi.resetPassword(payload);
            return response;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            state.status = "idle";
            state.error = null;
            state.message = null;
            clearAuthSession();
        },
        clearAuthFeedback(state) {
            state.error = null;
            state.message = null;
        },
        clearPasswordResetFlow(state) {
            state.passwordReset = {
                email: null,
                codeVerified: false,
            };
            state.passwordResetStatus = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const authData = action.payload.data;

                if (!authData?.user || !authData.token) {
                    state.status = "failed";
                    state.user = null;
                    state.token = null;
                    state.error = "Login response is missing user or token.";
                    clearAuthSession();
                    return;
                }

                state.status = "succeeded";
                state.user = authData.user;
                state.token = authData.token;
                state.message = action.payload.message;

                persistAuthSession(authData.user, authData.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = String(action.payload);
            })
            .addCase(signupUser.pending, (state) => {
                state.status = "loading";
                state.error = null;
                state.message = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.message = action.payload.message;
                state.user = null;
                state.token = null;
                clearAuthSession();
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.status = "failed";
                state.error = String(action.payload);
            })
            .addCase(requestPasswordReset.pending, (state) => {
                state.passwordResetStatus = "loading";
                state.error = null;
                state.message = null;
            })
            .addCase(requestPasswordReset.fulfilled, (state, action) => {
                state.passwordResetStatus = "succeeded";
                state.message = action.payload.message;
                state.passwordReset.email = action.payload.email;
                state.passwordReset.codeVerified = false;
            })
            .addCase(requestPasswordReset.rejected, (state, action) => {
                state.passwordResetStatus = "failed";
                state.error = String(action.payload);
            })
            .addCase(verifyPasswordResetCode.pending, (state) => {
                state.passwordResetStatus = "loading";
                state.error = null;
                state.message = null;
            })
            .addCase(verifyPasswordResetCode.fulfilled, (state, action) => {
                state.passwordResetStatus = "succeeded";
                state.message = action.payload.message;
                state.passwordReset.email = action.payload.email;
                state.passwordReset.codeVerified = true;
            })
            .addCase(verifyPasswordResetCode.rejected, (state, action) => {
                state.passwordResetStatus = "failed";
                state.error = String(action.payload);
            })
            .addCase(resetPassword.pending, (state) => {
                state.passwordResetStatus = "loading";
                state.error = null;
                state.message = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.passwordResetStatus = "succeeded";
                state.message = action.payload.message;
                state.passwordReset = {
                    email: null,
                    codeVerified: false,
                };
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.passwordResetStatus = "failed";
                state.error = String(action.payload);
            });
    },
});

export const { clearAuthFeedback, clearPasswordResetFlow, logout } =
    authSlice.actions;

export default authSlice.reducer;
