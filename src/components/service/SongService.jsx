export const SongService = {
  getSongsData() {
    return [
     {
       id: "1009",
       progress: 299,
       name: "teenage blues",
       artist: "Dreamgrill",
       orders: [
         {
           id: "1009-0",
           tabId: "1"
         },
       ],
     },

   ];
  },



  getSongs() {
    return Promise.resolve(this.getSongsData());
  },


};
