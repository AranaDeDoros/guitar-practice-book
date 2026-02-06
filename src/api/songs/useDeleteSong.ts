import { useMutation, useQueryClient } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import { SongDeleteDTO } from "../../infra/dtos/SongDeleteDTO";
import client from "../client";

export const useDeleteSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: SongDeleteDTO) => {
      await client.delete(`/songs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
    },
  });
};
