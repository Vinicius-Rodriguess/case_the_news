import { Opening } from "./Opening";
import { User } from "./User";

export interface Metrics {
  engagementMetrics: {
    totalUsers: number;
    totalOpenings: number;
    totalUniqueOpenings: number;
    avgStreak: number;
  };
  topUsers: User[];
  topOpenings: Opening[];
  allUniqueOpenings: Opening[];
}
