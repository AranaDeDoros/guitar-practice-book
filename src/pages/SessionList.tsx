import { TabMenu } from "primereact/tabmenu";
import { JSX, useState } from "react";
import { Session } from "../domain/types/Session";

export const SessionList = ({
  sessions,
}: {
  sessions: Session[];
}): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <TabMenu
        model={sessions.map((session: Session, index: number) => ({
          label: `${session.name}`,
          command: () => setActiveIndex(index),
        }))}
        activeIndex={activeIndex}
      />
    </div>
  );
};
