export interface SafeUser {
    _id: string;
    name: string;
    email: string;
    role: string;
    profilePicUrl?: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phone: string;
    profilePicUrl?: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface VerifyResetCodeRequest {
    email: string;
    code: string;
}

export interface ResetPasswordRequest {
    email: string;
    code: string;
    newPassword: string;
}

export interface AuthSuccessData {
    user: SafeUser;
    token?: string;
}
