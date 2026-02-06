import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../client"
import { sessionKeys } from "./sessionKeys";
import { songKeys } from "../songs/songKeys";
import { SessionDeleteDTO } from "../../dtos/SessionDeleteDTO";

export const useSongDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: SessionDeleteDTO) => {
      await client.delete(`/sessions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });
      queryClient.invalidateQueries({ queryKey: songKeys.all });
    },
  });
};
