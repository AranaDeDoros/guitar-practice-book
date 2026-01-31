import "./App.css";
import { JSX } from "react";

import List from "./components/List";
import { Panel } from "primereact/panel";
// main.jsx or App.jsx

function App(): JSX.Element {
  return (
    <>
      <Panel>
        <List />
      </Panel>
    </>
  );
}

export default App;
