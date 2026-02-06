import { useMutation, useQueryClient } from "@tanstack/react-query";
import { songKeys } from "./songKeys";
import { SongUpdateDTO } from "../../infra/dtos/SongUpdateDTO";
import  client  from "../client";

export const useUpdateSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, progress }: SongUpdateDTO) => {
      await client.put(`/songs/${id}`, { progress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: songKeys.all });
    },
  });
};
