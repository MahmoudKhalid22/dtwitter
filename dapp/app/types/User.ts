export interface User {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  wallet: string;
}

export interface Dweet {
  author: string;
  content: string;
  timestamp: number;
  likes: number;
}
