export interface LinktreeLink {
    _id: string;
    title: string;
    url: string;
}

export interface LinktreeData {
    _id: string;
    userId: string | Record<string, unknown>;
    username: string;
    links: LinktreeLink[];
    createdAt?: string;
    updatedAt?: string;
}

export interface GetLinktreeResponse {
    message: string;
    linktree: LinktreeData;
}

export interface UpdateUsernameRequest {
    username: string;
}

export interface AddLinkRequest {
    title: string;
    url: string;
}

export interface AddLinkResponse {
    message: string;
    link: LinktreeLink;
    linktree: LinktreeData;
}

export interface DeleteLinkResponse {
    message: string;
    linktree: LinktreeData;
}
