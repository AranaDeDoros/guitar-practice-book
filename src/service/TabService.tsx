import { Config } from "../Config";
import { TabRequestDTO } from "../dtos/TabRequest";

const BACKEND_URL = Config.BACKENDURL;
export const TabService = {
  async getTabData(requestDTO: TabRequestDTO): Promise<string> {
    console.log("Fetching tab data with request:", requestDTO);
    try {
      const tabReq = await fetch(`${BACKEND_URL}/scrape/tab`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestDTO),
      });
      const tab = await tabReq.text();
      return tab;
    } catch (err) {
      console.log("Error fetching tab data:", err);
      return "";
    }
  },
};
