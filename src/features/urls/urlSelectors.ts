import type { RootState } from "../../app/store";

export const selectUrls = (state: RootState) => state.urls.urls;
export const selectUrlsStatus = (state: RootState) => state.urls.status;
export const selectUrlsError = (state: RootState) => state.urls.error;
export const selectShortenStatus = (state: RootState) => state.urls.shortenStatus;
export const selectShortenError = (state: RootState) => state.urls.shortenError;
export const selectLastShortenedUrl = (state: RootState) => state.urls.lastShortenedUrl;
export const selectDeleteStatus = (state: RootState) => state.urls.deleteStatus;
