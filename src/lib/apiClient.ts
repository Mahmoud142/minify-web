const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "").replace(
    /\/+$/,
    "",
);

export interface ApiResponse<TData = undefined> {
    status: "success" | "error";
    message: string;
    data?: TData;
}

export class ApiError extends Error {
    statusCode?: number;

    constructor(message: string, statusCode?: number) {
        super(message);
        this.name = "ApiError";
        this.statusCode = statusCode;
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
    token?: string | null;
}

function buildUrl(path: string) {
    if (!path.startsWith("/")) {
        throw new ApiError("API paths must start with a forward slash.");
    }

    return `${API_BASE_URL}${path}`;
}

export async function apiRequest<TData>(
    path: string,
    options: RequestOptions = {},
): Promise<ApiResponse<TData>> {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");

    if (options.token) {
        headers.set("Authorization", `Bearer ${options.token}`);
    }

    const response = await fetch(buildUrl(path), {
        ...options,
        credentials: "omit",
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        referrerPolicy: "no-referrer",
    });

    const payload = (await response.json().catch(() => undefined)) as
        | ApiResponse<TData>
        | undefined;

    if (!response.ok || payload?.status === "error") {
        throw new ApiError(
            payload?.message || "Something went wrong. Please try again.",
            response.status,
        );
    }

    if (!payload) {
        throw new ApiError("The server returned an empty response.");
    }

    return payload;
}
