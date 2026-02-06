import { useMutation, useQueryClient } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import { SongDTO } from "../../domain/types/SongDTO";
import { SongCreateDTO } from "../../infra/dtos/SongCreateDTO";
import client from "../client";

export const useCreateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SongCreateDTO) => {
      const { data } = await client.post<SongDTO>("/songs", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
    },
  });
};
