import { CurrentRoom } from "./CurrentRoom";

export type Room = {
  currentRoom: CurrentRoom | null;
  switchRoom: (rid: string) => void;
};
