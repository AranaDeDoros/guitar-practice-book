import {ProgressEnum} from "../../enums/ProgressEnum"
export const SongService = {
  getSongsData() {
    return [
     {
       id: "1009",
       progress:50,
       name: "teenage blues",
       artist: "Dreamgrill",
       tabs: [
         {
           id: "1009-0",
           tabUrl: "https://tabs.ultimate-guitar.com/tab/dreamgirl/teenage-blue-tabs-3131648",
           comment:"comentario"
         },
       ],
     },

   ];
  },

  getSongs() {
    return Promise.resolve(this.getSongsData());
  },


};
