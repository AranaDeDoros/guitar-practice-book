import { Panel } from "primereact/panel";
import { JSX } from "react";

interface PlayerProps {
  url?: string;
}

export function Player(props: PlayerProps): JSX.Element {
  return (
    <>
      <Panel>
        {props.url ? (
          <iframe
            width="560"
            height="315"
            src={props.url}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : null}
      </Panel>
    </>
  );
}
