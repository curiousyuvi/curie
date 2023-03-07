import { User } from "./User";

export type VotingRoom = {
  voting: boolean;
  yesUsers: string[];
  noUsers: string[];
  onlineUsers: User[];
};
