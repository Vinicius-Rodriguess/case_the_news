import { Opening } from "./Opening";

export interface User {
  id: number;
  email: string;
  totalStreak: number;
  consecutiveStreak: number;
  highestConsecutiveStreak: number;
  lastOpenedAt: string;
  openings: Opening[];
  createdAt: string;
  updatedAt: string;
}
