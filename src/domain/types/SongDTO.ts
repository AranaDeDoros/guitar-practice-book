import { TabDTO } from "./TabDTO";
export interface SongDTO {
  id: string;
  title: string;
  artist: string;
  video: string;
  tab: TabDTO;
  comment: string;
  progress: number;
}
