import { TabDTO } from "./TabDTO";
export interface SongCreateDTO {
  title: string;
  artist: string;
  video: string;
  tab: TabDTO;
  progress: number;
}
