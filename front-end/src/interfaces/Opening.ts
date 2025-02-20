import { User } from "./User";

export interface Opening {
  id: number;
  newsletterId: string;
  openedAt: string;
  publicationDate: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmChannel?: string;
  openingsCount?: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}