import type { RootState } from "../../app/store";

export const selectLinktree = (state: RootState) => state.linktree.linktree;
export const selectLinktreeStatus = (state: RootState) => state.linktree.status;
export const selectLinktreeError = (state: RootState) => state.linktree.error;
