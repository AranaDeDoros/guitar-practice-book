import { useQuery } from "@tanstack/react-query";
import  client  from "../client";
import { SongDTO } from "../../domain/types/SongDTO";
import { songKeys } from "./songKeys";

export const useSongs = () => {
  return useQuery<SongDTO[]>({
    queryKey: songKeys.all,
    queryFn: async () => {
      const { data } = await client.get<SongDTO[]>("/songs");
      return data;
    },
  });
};
