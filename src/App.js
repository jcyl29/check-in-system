import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './App.scss';
import './dialog-polyfill.css';
import { getVisitors, addVisitor, signOut } from './api';
import VisitorList from './VisitorList';
import NewVisitorDialog from './NewVisitorDialog';
import SearchVisitor from './SearchVisitor';
import PageControls from './PageControls';

const App = () => {
  const [visitors, setVisitors] = useState({ totalPages: 0, data: [] });
  const [showDialog, setShowDialog] = useState(false);
  const [isFilteredBySignout, setIsFilteredBySignout] = useState(false);

  const getResultsByPage = ({ page = 1, data }) => {
    const resultsPerPage = process.env.REACT_APP_RESULTS_PER_PAGE;
    return data.slice((page - 1) * resultsPerPage,  page * resultsPerPage);
  };

  const queryVisitors = async (filterOptions = {}, page = 1) => {
    const response = await getVisitors(filterOptions);
    const visitorData = response.data.map(({ id, attributes }) => {
      return {
        id,
        name: attributes.name,
        notes: attributes.notes,
        signOut: attributes.sign_out,
        loading: false,
      };
    });
    setVisitors({
      totalPages: Math.ceil(visitorData.length / process.env.REACT_APP_RESULTS_PER_PAGE),
      data: getResultsByPage({ page, data: visitorData }),
    });
  };

  const signOutVisitor = id => {
    const visitorIndex = visitors.findIndex(data => data.id === id);
    visitors[visitorIndex].loading = true;
    setVisitors([...visitors]);
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
    queryVisitors();
  }, []);

  return (
    <div className="App">
      <header>
        <img height="50" width="50" alt="logo" src={logo} />
        <div className="search-add">
          <SearchVisitor queryVisitors={queryVisitors} />
          <button className="add-visitor" onClick={() => setShowDialog(true)}>
            <i className="fas fa-user" />
            New Visitor
          </button>
        </div>
      </header>
      <form className="filter-by">
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
        visitorData={visitors}
        signOutVisitor={signOutVisitor}
        isFilteredBySignout={isFilteredBySignout}
      />
      <PageControls
        totalPages={visitors.totalPages}
        onNextPage={page => queryVisitors({}, page)}
        onPrevPage={page => queryVisitors({}, page)}
      />
      <NewVisitorDialog
        show={showDialog}
        setShowDialog={setShowDialog}
        addNewVisitor={addNewVisitor}
      />
      <pre>{JSON.stringify(visitors, undefined, 2)}</pre>
    </div>
  );
};

export default App;
