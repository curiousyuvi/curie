import { Message } from "./Message";

export type CurrentRoom = {
  rid: string;
  name: string;
  users: string[];
  image_url: string;
  state: string;
  messages: Message[];
};
