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

export interface ShortenUrlRequest {
    originalUrl: string;
    shortCode?: string;
    expiresAt?: string;
}

export interface ShortenUrlResponse {
    message: string;
    id: string;
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    expiresAt?: string;
}

export interface GetMyUrlsResponse {
    message: string;
    urls: UrlData[];
}

export interface DeleteUrlResponse {
    message: string;
}

export interface ClickRecord {
    _id: string;
    urlId: string;
    userAgent: string;
    referrer: string;
    country: string;
    city: string;
    timestamp: string;
}

export interface UrlStatsResponse {
    message: string;
    url: UrlData;
    totalClicks: number;
    recentClicks: ClickRecord[];
    stats: {
        browsers: { _id: string; count: number }[];
        countries: { _id: string; count: number }[];
    };
}
