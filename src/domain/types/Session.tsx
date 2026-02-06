import { SongDTO } from "./SongDTO";

export interface SongOption {
  value: string;
  label: string;
}

export interface Session {
  id: string;
  name: string;
  description: string;
  songs: SongDTO[];
}
