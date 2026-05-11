import type { SafeUser } from "./authTypes";

const AUTH_TOKEN_KEY = "minify.auth.token";
const AUTH_USER_KEY = "minify.auth.user";

export function getStoredToken() {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)?.trim();
    return token || null;
}

function isSafeUser(value: unknown): value is SafeUser {
    if (!value || typeof value !== "object") {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        typeof user._id === "string" &&
        typeof user.name === "string" &&
        typeof user.email === "string" &&
        typeof user.role === "string" &&
        (user.profilePicUrl === undefined ||
            typeof user.profilePicUrl === "string")
    );
}

export function getStoredUser() {
    const user = localStorage.getItem(AUTH_USER_KEY);

    if (!user) {
        return null;
    }

    try {
        const parsedUser = JSON.parse(user) as unknown;

        if (!isSafeUser(parsedUser)) {
            localStorage.removeItem(AUTH_USER_KEY);
            return null;
        }

        return parsedUser;
    } catch {
        localStorage.removeItem(AUTH_USER_KEY);
        return null;
    }
}

export function persistAuthSession(user: SafeUser, token: string) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthSession() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
}
