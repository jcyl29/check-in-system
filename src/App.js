import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import "./App.scss";
import "./dialog-polyfill.css";
import { getVisitors, addVisitor, signOut } from "./api";
import VisitorList from "./VisitorList";
import NewVisitorDialog from "./newVisitorDialog";
import SearchVisitor from "./searchVisitor";

const App = () => {
  const [visitors, setVisitors] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isFilteredBySignout, setIsFilteredBySignout] = useState(false);

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

  const handleCheckBoxOnChange = evt => {
    setIsFilteredBySignout(evt.target.checked);
  };

  useEffect(() => {
    // by separating all the API requests as individual functions, i am essentially making a IIFE for an async function.
    // i'm trying to do "top-level await"
    // https://v8.dev/features/top-level-await

    // queryVisitors();
  }, []);

  return (
    <div className="App">
      <header>
        <img height="50" width="50" alt="logo" src={logo} />
        <SearchVisitor queryVisitors={queryVisitors} />
        <button className="add-visitor" onClick={() => setShowDialog(true)}>
          <i className="fas fa-user" />
          New Visitor
          {/*<i className="fas fa-spinner"></i>*/}
        </button>
      </header>
      <form className='filter-by'>
        <fieldset>
          <legend>Filter by:</legend>
          <input
            type="checkbox"
            id="signed-out"
            onChange={handleCheckBoxOnChange}
            checked={isFilteredBySignout}
          />
          <label htmlFor="signed-out">Signed-out</label>
        </fieldset>
      </form>
      <VisitorList
        data={visitors}
        signOutVisitor={signOutVisitor}
        isFilteredBySignout={isFilteredBySignout}
      />
      <NewVisitorDialog
        show={showDialog}
        setShowDialog={setShowDialog}
        addNewVisitor={addNewVisitor}
      />
    </div>
  );
};

export default App;
