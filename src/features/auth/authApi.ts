import { apiRequest } from "../../lib/apiClient";
import type {
    AuthSuccessData,
    ForgotPasswordRequest,
    LoginRequest,
    ResetPasswordRequest,
    SignupRequest,
    VerifyResetCodeRequest,
} from "./authTypes";

const AUTH_BASE_PATH = "/auth";

export const authApi = {
    signup(payload: SignupRequest) {
        return apiRequest<AuthSuccessData>(`${AUTH_BASE_PATH}/signup`, {
            method: "POST",
            body: payload,
        });
    },

    login(payload: LoginRequest) {
        return apiRequest<AuthSuccessData>(`${AUTH_BASE_PATH}/login`, {
            method: "POST",
            body: payload,
        });
    },

    forgotPassword(payload: ForgotPasswordRequest) {
        return apiRequest(`${AUTH_BASE_PATH}/forgot-password`, {
            method: "POST",
            body: payload,
        });
    },

    verifyResetCode(payload: VerifyResetCodeRequest) {
        return apiRequest(`${AUTH_BASE_PATH}/verify-reset-code`, {
            method: "POST",
            body: payload,
        });
    },

    resetPassword(payload: ResetPasswordRequest) {
        return apiRequest(`${AUTH_BASE_PATH}/reset-password`, {
            method: "POST",
            body: payload,
        });
    },
};
