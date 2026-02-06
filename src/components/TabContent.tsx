import { useState, useEffect, useDeferredValue } from "react";
import { TabService } from "../service/TabService";
import { DeferredContent } from "primereact/deferredcontent";
import { BlockUI } from "primereact/blockui";
import { Inplace, InplaceDisplay, InplaceContent } from "primereact/inplace";
import { TabDTO } from "../domain/types/TabDTO";
import { JSX } from "react";
import { TabRequestDTO } from "../infra/dtos/TabRequest";
import { TabSource } from "../domain/enums/TabSourceEnum";

interface TabContentProps {
  tab: TabDTO;
  name: string;
  comment?: string;
}

export const TabContent = ({
  tab,
  name,
  comment = "",
}: TabContentProps): JSX.Element => {
  const [tabData, setTabData] = useState<string | null>(null);
  const [blocked, setBlocked] = useState(true);
  const tabService = TabService;
  //if it's still slow, render in chunks
  const deferredTabData = useDeferredValue(tabData);
  console.log(tab, name, comment);
  useEffect(() => {
    const requestDTO: TabRequestDTO = {
      tab: tab,
      source: TabSource.ULTIMATE_GUITAR,
    };
    tabService.getTabData(requestDTO).then((data) => {
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
