import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import { testApi } from "./api";

// curl -H "X-Api-Key: a9bcae20371ea29613ac" -g "https://mini-visitors-service.herokuapp.com/api/entries"

function App() {
  const [result, setResult] = useState("");
  const test = () => {
    testApi().then(resp => {
      setResult(resp);
    });
  };
  return (
    <div className="App">
      <button onClick={test}>
        Edit <code>src/App.js</code> and sdfdsaflkjdsfksdj lksddskjfdslkfjave to
        reload.
      </button>
      <pre>{JSON.stringify(result)}</pre>
    </div>
  );
}

export default App;
