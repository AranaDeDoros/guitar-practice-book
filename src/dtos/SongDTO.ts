export interface SongDTO {
  id: string;
  progress: number;
  name: string;
  artist: string;
  tabs: TabDTO[];
}
