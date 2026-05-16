export interface UserProfile {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    profilePicUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface GetProfileResponse {
    user: UserProfile;
}

export interface UpdateProfileRequest {
    name?: string;
    email?: string;
    phone?: string;
    profilePicUrl?: string;
    password?: string;
}

export interface UpdateProfileResponse {
    user: UserProfile;
}
