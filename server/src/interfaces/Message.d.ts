export type Message = {
  mid?: string;
  type: 'text' | 'notification' | 'music';
  content: string;
  sender: string;
};
