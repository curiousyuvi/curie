export type Message = {
  mid?: string;
  type: 'text' | 'notification';
  content: string;
  sender: string;
};
