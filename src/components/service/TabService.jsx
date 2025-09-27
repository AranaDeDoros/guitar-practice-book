export const TabService = {
  async getTabData(url) {
   try{
         const tabReq = await fetch('http://172.30.48.1:8080/api/scrape/tab');
           const json = tabReq.text();
           return json;
   } catch(err){
    return "";
   }
  },

};
