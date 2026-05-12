import { apiRequest } from "../../lib/apiClient";
import type { GetMyUrlsResponse, DeleteUrlResponse } from "./urlTypes";

const URL_BASE_PATH = "/url";

export const urlApi = {
    getMyUrls() {
        return apiRequest<GetMyUrlsResponse>(`${URL_BASE_PATH}/my-urls`, {
            method: "GET",
        });
    },

    deleteUrl(id: string) {
        return apiRequest<DeleteUrlResponse>(`${URL_BASE_PATH}/${id}`, {
            method: "DELETE",
        });
    },
};
