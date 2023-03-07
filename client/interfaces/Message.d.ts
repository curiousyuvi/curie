export type Message = {
  rid: string;
  mid: string;
  type: "text" | "notification" | "music";
  content: string;
  senderName: string;
  senderAvatar: string;
  senderUid: string;
};
