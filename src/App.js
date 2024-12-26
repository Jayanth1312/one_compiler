import React from "react";
import LanguageBarGraph from "./components/barGraph";
import TopTotal from "./components/topTotal";
import TotalLang from "./components/totalLang";
import "./App.css";

function App() {
  return (
    <div className="App">
      <TotalLang/>
      <div className="graph-cards">
        <LanguageBarGraph />
        <TopTotal />
      </div>
    </div>
  );
}

export default App;
