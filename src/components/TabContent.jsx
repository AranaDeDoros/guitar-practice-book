import React, { useState, useEffect, useRef , memo } from "react";
import { TabService } from "./service/TabService";
import { DeferredContent } from 'primereact/deferredcontent';
import { BlockUI } from 'primereact/blockui';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';

export const TabContent = ({ tabUrl, name, comment, tabService = TabService }) => {
  const [tabData, setTabData] = useState(null);
  const [blocked, setBlocked] = useState(true);

  useEffect(() => {
    tabService.getTabData(tabUrl).then(data => {
      setTabData(data);
      setBlocked(false);
    });
  }, [tabUrl, tabService]);

  return (
    <BlockUI blocked={blocked} fullScreen>
      <Inplace>
        <InplaceDisplay>view comment</InplaceDisplay>
        <InplaceContent>
          <p className="m-0">{comment}</p>
        </InplaceContent>
      </Inplace>
      <DeferredContent>
        <div className="p-3" style={stylesheet.tabDiv}>
          <h5>{name}</h5>
          <pre style={stylesheet.tabPrev}>{tabData}</pre>
        </div>
      </DeferredContent>
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