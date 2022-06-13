import { RoomShort } from "./RoomShort";

export type User = {
  uid: string;
  name: string;
  username: string;
  avatar_url: string;
  rooms: RoomShort[];
  status: string;
};
