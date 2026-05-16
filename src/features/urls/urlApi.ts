import { apiRequest } from "../../lib/apiClient";
import type {
    ShortenUrlRequest,
    ShortenUrlResponse,
    GetMyUrlsResponse,
    DeleteUrlResponse,
    UrlStatsResponse,
} from "./urlTypes";

const URL_BASE_PATH = "/url";

export const urlApi = {
    shortenUrl(payload: ShortenUrlRequest) {
        return apiRequest<ShortenUrlResponse>(`${URL_BASE_PATH}/shorten`, {
            method: "POST",
            body: payload,
        });
    },

    getMyUrls() {
        return apiRequest<GetMyUrlsResponse>(`${URL_BASE_PATH}/my-urls`, {
            method: "GET",
        });
    },

    getUrlStats(id: string) {
        return apiRequest<UrlStatsResponse>(`${URL_BASE_PATH}/${id}/stats`, {
            method: "GET",
        });
    },

    deleteUrl(id: string) {
        return apiRequest<DeleteUrlResponse>(`${URL_BASE_PATH}/${id}`, {
            method: "DELETE",
        });
    },
};
