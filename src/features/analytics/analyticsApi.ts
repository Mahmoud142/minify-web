import { apiRequest } from "../../lib/apiClient";
import type { GlobalAnalyticsResponse } from "./analyticsTypes";

const URL_BASE_PATH = "/url";

export const analyticsApi = {
    async getGlobalAnalytics() {
        return apiRequest<GlobalAnalyticsResponse>(`${URL_BASE_PATH}/analytics`, {
            method: "GET",
        });
    },
};
