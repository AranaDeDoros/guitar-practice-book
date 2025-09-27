import React, { useState, useEffect, useRef , memo } from "react";
import { TabService } from "./service/TabService";

import { BlockUI } from 'primereact/blockui';


export const TabContent = ({ tabUrl, name }) => {
  const [tabData, setTabData] = useState(null);
   const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    TabService.getTabData(tabUrl).then(data => {
      setTabData(data);
       setBlocked(false);
    })
  }, [tabUrl]);

  return (
     <BlockUI blocked={blocked} fullScreen >
        <div className="p-3" style={stylesheet.tabDiv}>
          <h5> {name}</h5>
          <pre style={stylesheet.tabPrev}>{tabData}</pre>
        </div>
    </BlockUI>
  );
};

const stylesheet = {
  tabDiv : {

         overflow: "scroll"
  },

  tabPrev : {
         height: "200px",
  }
}