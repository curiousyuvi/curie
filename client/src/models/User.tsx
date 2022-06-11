import { CurrentUser } from "./CurrentUser";

export type User = {
  currentUser: CurrentUser | null;
  token: string;
  refreshToken: string;
};
