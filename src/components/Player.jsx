import { Panel } from "primereact/panel";

export  function Player(props) {

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
