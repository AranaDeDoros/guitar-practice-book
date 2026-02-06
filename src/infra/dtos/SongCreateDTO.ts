import { TabCreateDTO } from "./TabCreateDTO";

export interface SongCreateDTO {
  title: string;
  artist: string;
  video: string;
  tab: TabCreateDTO;
  comment: string;
  progress: number;
}
