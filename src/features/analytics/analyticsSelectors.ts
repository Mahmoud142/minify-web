import type { RootState } from "../../app/store";

export const selectAnalyticsData = (state: RootState) => state.analytics.data;
export const selectAnalyticsStatus = (state: RootState) => state.analytics.status;
export const selectAnalyticsError = (state: RootState) => state.analytics.error;
