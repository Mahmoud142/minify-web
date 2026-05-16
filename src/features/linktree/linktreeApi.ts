import { apiRequest } from "../../lib/apiClient";
import type {
    GetLinktreeResponse,
    UpdateProfileRequest,
    AddLinkRequest,
    AddLinkResponse,
    DeleteLinkResponse,
} from "./linktreeTypes";

const LINKTREE_BASE_PATH = "/minf";

export const linktreeApi = {
    getMyLinktree() {
        return apiRequest<GetLinktreeResponse>(LINKTREE_BASE_PATH, {
            method: "GET",
        });
    },

    updateProfile(payload: UpdateProfileRequest) {
        return apiRequest(`${LINKTREE_BASE_PATH}/username`, {
            method: "PATCH",
            body: payload,
        });
    },

    addLink(payload: AddLinkRequest) {
        return apiRequest<AddLinkResponse>(`${LINKTREE_BASE_PATH}/links`, {
            method: "POST",
            body: payload,
        });
    },

    deleteLink(linkId: string) {
        return apiRequest<DeleteLinkResponse>(
            `${LINKTREE_BASE_PATH}/links/${linkId}`,
            {
                method: "DELETE",
            },
        );
    },

    getPublicLinktree(username: string) {
        return apiRequest<GetLinktreeResponse>(`${LINKTREE_BASE_PATH}/${username}`, {
            method: "GET",
        });
    },
};
