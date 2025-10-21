import {ProgressEnum} from "../../enums/ProgressEnum"
import type { SongDTO } from "../../dtos/SongDTO";
import type { TabDTO } from "../../dtos/TabDTO";

const tab : TabDTO =  {
   id: "1009-0",
   tabUrl: "https://tabs.ultimate-guitar.com/tab/dreamgirl/teenage-blue-tabs-3131648",
   comment: "comentario",
 }

const song: SongDTO = {
  id: "1009",
  progress: 50,
  name: "teenage blues",
  artist: "Dreamgrill",
  tabs: [
    tab
  ],
};

export const SongService = {
  getSongsData: (): SongDTO[] => [song],

  getSongs: async (): Promise<SongDTO[]> => {
    return Promise.resolve(SongService.getSongsData());
  },
};
