import { useState, useEffect, useDeferredValue } from "react";
import { TabService } from "../service/TabService";
import { DeferredContent } from "primereact/deferredcontent";
import { BlockUI } from "primereact/blockui";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";

export const TabContent = ({ tab, name, comment, tabService = TabService }) => {
  const [tabData, setTabData] = useState(null);
  const [blocked, setBlocked] = useState(true);
  //if it's still slow, render in chunks
  const deferredTabData = useDeferredValue(tabData);
  useEffect(() => {
    tabService.getTabData(tab.url).then((data) => {
      setTabData(data);
      setBlocked(false);
    });
  }, [tab, tabService]);

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
          <pre style={stylesheet.tabPrev}>{deferredTabData}</pre>
        </div>
      </DeferredContent>
    </BlockUI>
  );
};

const stylesheet = {
  tabDiv: {
    overflow: "scroll",
  },

  tabPrev: {
    height: "200px",
  },
};
