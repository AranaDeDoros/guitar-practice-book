const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
export const TabService = {
  async getTabData(requestDTO) {
    try {
      const tabReq = await fetch(`${BACKEND_URL}/api/scrape/tab`, {
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
      return;
    }
  },
};
