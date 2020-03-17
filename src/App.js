import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import './dialog-polyfill.css';
import { getVisitors, addVisitor, signOut } from './api';
import VisitorList from './VisitorList';
import NewVisitorDialog from './newVisitorDialog';
import SearchVisitor from './searchVisitor';

const App = () => {
  const [visitors, setVisitors] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  const queryVisitors = async (filterOptions = {}) => {
    const response = await getVisitors(filterOptions);
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

  const signOutVisitor = id => {
    signOut(id).then(() => {
      queryVisitors();
    });
  };

  const addNewVisitor = ({ name, notes }) => {
    return addVisitor({ name, notes }).then(() => {
      queryVisitors();
    });
  };

  useEffect(() => {
    // by separating all the API requests as individual functions, i am essentially making a IIFE for an async function.
    // i'm trying to do "top-level await"
    // https://v8.dev/features/top-level-await

    queryVisitors();
  }, []);

  return (
    <div className="App">
      <header>
        <img height="50" width="50" alt="logo" src={logo} />
        <SearchVisitor queryVisitors={queryVisitors} />
        <button onClick={() => setShowDialog(true)}>New Visitor</button>
      </header>
      <VisitorList data={visitors} signOutVisitor={signOutVisitor} />
      <NewVisitorDialog
        show={showDialog}
        setShowDialog={setShowDialog}
        addNewVisitor={addNewVisitor}
      />
    </div>
  );
};

export default App;
