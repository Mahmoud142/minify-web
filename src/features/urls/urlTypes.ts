export interface UrlData {
    _id: string;
    originalUrl: string;
    shortCode: string;
    userId: string;
    totalClicks: number;
    expiresAt?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface GetMyUrlsResponse {
    message: string;
    urls: UrlData[];
}

export interface DeleteUrlResponse {
    message: string;
}
