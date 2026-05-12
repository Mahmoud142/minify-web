import type { UrlData } from "../urls/urlTypes";

export interface AnalyticsLocation {
    country: string;
    count: number;
}

export interface GlobalAnalyticsResponse {
    totalClicks: number;
    topLocations: AnalyticsLocation[];
    urls: UrlData[];
}
