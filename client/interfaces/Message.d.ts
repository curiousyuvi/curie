export type Message = {
  mid: string;
  type: "text" | "notification" | "music";
  content: string;
  senderName: string;
  senderAvatar: string;
  senderUid: string;
};
