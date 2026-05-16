import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError } from "../../lib/apiClient";
import { linktreeApi } from "./linktreeApi";
import type { LinktreeData } from "./linktreeTypes";

interface LinktreeState {
    linktree: LinktreeData | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: LinktreeState = {
    linktree: null,
    status: "idle",
    error: null,
};

function getErrorMessage(error: unknown): string {
    if (error instanceof ApiError) return error.message;
    if (error instanceof Error) return error.message;
    return "Something went wrong. Please try again.";
}

export const fetchMyLinktree = createAsyncThunk(
    "linktree/fetchMyLinktree",
    async (_, { rejectWithValue }) => {
        try {
            const response = await linktreeApi.getMyLinktree();
            if (!response.data) {
                return rejectWithValue("No linktree data received");
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(getErrorMessage(error));
        }
    },
);

const linktreeSlice = createSlice({
    name: "linktree",
    initialState,
    reducers: {
        clearLinktreeError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyLinktree.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchMyLinktree.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.linktree = action.payload.linktree;
            })
            .addCase(fetchMyLinktree.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload as string;
            });
    },
});

export const { clearLinktreeError } = linktreeSlice.actions;
export default linktreeSlice.reducer;
