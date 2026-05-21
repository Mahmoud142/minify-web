import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../../lib/apiClient";
import { urlApi } from "./urlApi";
import type { UrlData, ShortenUrlRequest } from "./urlTypes";

interface UrlsState {
    urls: UrlData[];
    status: "idle" | "loading" | "succeeded" | "failed";
    shortenStatus: "idle" | "loading" | "succeeded" | "failed";
    deleteStatus: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    shortenError: string | null;
    lastShortenedUrl: string | null;
}

const initialState: UrlsState = {
    urls: [],
    status: "idle",
    shortenStatus: "idle",
    deleteStatus: "idle",
    error: null,
    shortenError: null,
    lastShortenedUrl: null,
};

function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) return error.message;
    if (error instanceof Error) return error.message;
    return "Something went wrong. Please try again.";
}

export const fetchMyUrls = createAsyncThunk(
    "urls/fetchMyUrls",
    async (_, { rejectWithValue }) => {
        try {
            const response = await urlApi.getMyUrls();
            if (!response.data) {
                return rejectWithValue("No URL data received");
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const shortenUrl = createAsyncThunk(
    "urls/shortenUrl",
    async (payload: ShortenUrlRequest, { rejectWithValue }) => {
        try {
            const response = await urlApi.shortenUrl(payload);
            if (!response.data) {
                return rejectWithValue("No data received from shorten");
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

export const deleteUrl = createAsyncThunk(
    "urls/deleteUrl",
    async (id: string, { rejectWithValue }) => {
        try {
            await urlApi.deleteUrl(id);
            return id;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

const urlsSlice = createSlice({
    name: "urls",
    initialState,
    reducers: {
        clearShortenState(state) {
            state.shortenStatus = "idle";
            state.shortenError = null;
            state.lastShortenedUrl = null;
        },
        clearUrlsError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch My URLs
            .addCase(fetchMyUrls.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMyUrls.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.urls = action.payload.urls;
            })
            .addCase(fetchMyUrls.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            })
            // Shorten URL
            .addCase(shortenUrl.pending, (state) => {
                state.shortenStatus = "loading";
                state.shortenError = null;
                state.lastShortenedUrl = null;
            })
            .addCase(shortenUrl.fulfilled, (state, action) => {
                state.shortenStatus = "succeeded";
                state.lastShortenedUrl = `${window.location.origin}/min.fy/${action.payload.shortCode}`;
                // Prepend the new URL into the list
                const newUrl: UrlData = {
                    _id: action.payload.id,
                    originalUrl: action.payload.originalUrl,
                    shortCode: action.payload.shortCode,
                    userId: "",
                    totalClicks: 0,
                    expiresAt: action.payload.expiresAt,
                    isActive: true,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                state.urls.unshift(newUrl);
            })
            .addCase(shortenUrl.rejected, (state, action) => {
                state.shortenStatus = "failed";
                state.shortenError = action.payload as string;
            })
            // Delete URL
            .addCase(deleteUrl.pending, (state) => {
                state.deleteStatus = "loading";
            })
            .addCase(deleteUrl.fulfilled, (state, action) => {
                state.deleteStatus = "succeeded";
                state.urls = state.urls.filter(
                    (url) => url._id !== action.payload,
                );
            })
            .addCase(deleteUrl.rejected, (state) => {
                state.deleteStatus = "failed";
            });
    },
});

export const { clearShortenState, clearUrlsError } = urlsSlice.actions;
export default urlsSlice.reducer;
