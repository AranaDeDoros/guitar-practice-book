export interface Song {
  id: string;
  title: string;
  artist: string;
}

export interface SongOption {
  value: string;
  label: string;
}

export interface Session {
  name: string;
  description: string;
  songs: Song[];
}
