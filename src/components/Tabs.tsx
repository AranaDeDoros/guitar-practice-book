import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { JSX } from "react";
import { SongDTO } from "../domain/types/SongDTO";

interface TabProps {
  name: string;
  songs: Array<SongDTO>;
}

export default function Tabs({ tabs }: { tabs: Array<TabProps> }): JSX.Element {
  return (
    <div className="card">
      <TabView>
        {tabs.map((e: TabProps, idx) => {
          return <TabPanel key={e.name + idx} header={e.name}></TabPanel>;
        })}
      </TabView>
    </div>
  );
}
