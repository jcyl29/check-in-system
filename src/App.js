import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import {getApi, postApi, signOut} from "./api"

// curl -H "X-Api-Key: a9bcae20371ea29613ac" -g "https://mini-visitors-service.herokuapp.com/api/entries"

function App() {
  const [result, setResult] = useState("");
  const [post, setPost] = useState("");
  const [signout, setSignout] = useState("");
  const test = () => {
    getApi().then(resp => {
      setResult(resp);
    });
  };
  return (
    <div className="App">
      <button onClick={test}>
        Edit <code>src/App.js</code> and sdfdsaflkjdsfksdj lksddskjfdslkfjave to
        reload.
      </button>
      <pre>{JSON.stringify(result, undefined, 2)}</pre>

      <button onClick={() => postApi().then(resp => setPost(resp))}>
        test add user
      </button>
      <pre>{JSON.stringify(post, undefined, 2)}</pre>

      <button onClick={() => signOut().then(resp => setSignout(resp))}>
        test signout
      </button>
      <pre>{JSON.stringify(signout, undefined, 2)}</pre>
    </div>
  );
}

export default App;
