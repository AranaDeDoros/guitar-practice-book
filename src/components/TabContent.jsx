import React, { useState, useEffect, useRef , memo } from "react";
import { TabService } from "./service/TabService";

export const TabContent = ({ tabUrl, name }) => {
  const [tabData, setTabData] = useState(null);

  useEffect(() => {
    TabService.getTabData(tabUrl).then(data => {
      setTabData(data);
    });
  }, [tabUrl]);

  return (
    <div className="p-3" style={stylesheet.tabDiv}>
      <h5> {name}</h5>
      <pre style={stylesheet.tabPrev}>{tabData}</pre>
    </div>
  );
};

const stylesheet = {
  tabDiv : {

         overflow: "scroll"
  },

  tabPrev : {
         height: "600px",
  }
}