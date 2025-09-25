import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import List from "./components/List";
import { Panel } from "primereact/panel";
// main.jsx or App.jsx




function App() {
  return (
    <>

      <Panel>
        <List />
      </Panel>
    </>
  );
}

export default App;
