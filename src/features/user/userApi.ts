import { apiRequest } from "../../lib/apiClient";
import type { 
    GetProfileResponse, 
    UpdateProfileRequest, 
    UpdateProfileResponse 
} from "./userTypes";

const USER_BASE_PATH = "/user";

export const userApi = {
    getProfile() {
        return apiRequest<GetProfileResponse>(`${USER_BASE_PATH}/profile`, {
            method: "GET",
        });
    },

    updateProfile(id: string, data: UpdateProfileRequest) {
        return apiRequest<UpdateProfileResponse>(`${USER_BASE_PATH}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        });
    },

    deleteUser(id: string) {
        return apiRequest(`${USER_BASE_PATH}/${id}`, {
            method: "DELETE",
        });
    },
};
