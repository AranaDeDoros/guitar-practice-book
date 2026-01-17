import { SongDTO } from "../dtos/SongDTO";
import { SongCreateDTO } from "../dtos/SongCreateDTO";
import { SongDeleteDTO } from "../dtos/SongDeleteDTO";
import { SongUpdateDTO } from "../dtos/SongUpdateDTO";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const SongService = {
  async getSongs(): Promise<SongDTO[]> {
    try {
      const response = await fetch(`${BACKEND_URL}/songs`);

      if (!response.ok) {
        console.error("Error fetching songs:", response.statusText);
        return [];
      }

      const data: SongDTO[] = await response.json();
      return data;
    } catch (error) {
      console.error("Network error:", error);
      return [];
    }
  },
  async createSong(song: SongCreateDTO): Promise<boolean> {
    try {
      const response = await fetch(`${BACKEND_URL}/songs/store`, {
        method: "POST",
        body: JSON.stringify(song),
      });

      if (!response.ok) {
        console.error("Error updating songs:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  },
  async updateSong(song: SongUpdateDTO): Promise<boolean> {
    try {
      const response = await fetch(`${BACKEND_URL}/songs/${song.id}/update`, {
        method: "POST",
        body: JSON.stringify(song),
      });

      if (!response.ok) {
        console.error("Error updating songs:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  },
  async deleteSong(song: SongDeleteDTO): Promise<boolean> {
    try {
      const response = await fetch(`${BACKEND_URL}/songs/${song.id}/delete`, {
        method: "POST",
        body: JSON.stringify(song),
      });

      if (!response.ok) {
        console.error("Error updating songs:", response.statusText);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Network error:", error);
      return false;
    }
  },
};
