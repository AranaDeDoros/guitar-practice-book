import {ProgressEnum} from "../../enums/ProgressEnum"
export const SongService = {
  getSongsData() {
    return [
     {
       id: "1009",
       progress:50,
       name: "teenage blues",
       artist: "Dreamgrill",
       orders: [
         {
           id: "1009-0",
           tabUrl: "https://tabs.ultimate-guitar.com/tab/dreamgirl/teenage-blue-tabs-3131648",
         },
       ],
     },

   ];
  },

  getSongs() {
    return Promise.resolve(this.getSongsData());
  },


};
