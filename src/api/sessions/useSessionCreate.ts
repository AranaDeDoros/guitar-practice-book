import { useMutation, useQueryClient } from "@tanstack/react-query";
import  client  from "../client";
import { sessionKeys } from "./sessionKeys";
import { songKeys } from "../songs/songKeys";
import { SessionCreateDTO } from "../../infra/dtos/SessionCreateDTO";


export const useSongCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SessionCreateDTO) => {
      const { data } = await client.post("/sessions", payload);
      return data;
    },
    onSuccess: () => {
      // session list changed
      queryClient.invalidateQueries({ queryKey: sessionKeys.all });

      // songs list likely changed too
      queryClient.invalidateQueries({ queryKey: songKeys.all });
    },
  });
};
