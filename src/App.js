import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.scss";
import { getVisitors, postApi, signOut } from "./api";
import VisitorList from "./VisitorList";

const App = () => {
  const [result, setResult] = useState("");
  const [post, setPost] = useState("");
  const [signout, setSignout] = useState("");
  const [visitors, setVisitors] = useState([]);

  const getAllVistors = async () => {
    const response = await getVisitors();
    const visitorData = response.data.map(({ id, attributes }) => {
      return {
        id,
        name: attributes.name,
        notes: attributes.notes,
        signOut: attributes.sign_out
      };
    });
    setVisitors(visitorData);
  };

  const test = () => {
    getAllVistors().then(resp => {
      setResult(resp);
    });
  };

  useEffect(() => {
    // by separating all the API requests as individual functions, i am essentially making a IIFE for an async function.
    // i'm trying to do "top-level await"
    // https://v8.dev/features/top-level-await
    getAllVistors();
  }, []);

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
      <header>
        <img height="50" width="50" alt="logo" src={logo} />
        <input placeholder="Search" />
        <button>New Visitor</button>
      </header>
      <VisitorList data={visitors} />
    </div>
  );
};

export default App;
