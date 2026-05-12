import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../../lib/apiClient";
import { analyticsApi } from "./analyticsApi";
import type { GlobalAnalyticsResponse } from "./analyticsTypes";

interface AnalyticsState {
    data: GlobalAnalyticsResponse | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AnalyticsState = {
    data: null,
    status: "idle",
    error: null,
};

export const fetchGlobalAnalytics = createAsyncThunk(
    "analytics/fetchGlobalAnalytics",
    async (_, { rejectWithValue }) => {
        try {
            const response = await analyticsApi.getGlobalAnalytics();
            if (!response.data) {
                return rejectWithValue("No analytics data received");
            }
            return response.data;
        } catch (error) {
            if (error instanceof ApiError) {
                return rejectWithValue(error.message);
            }
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("An unknown error occurred");
        }
    },
);

const analyticsSlice = createSlice({
    name: "analytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGlobalAnalytics.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchGlobalAnalytics.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchGlobalAnalytics.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export default analyticsSlice.reducer;
