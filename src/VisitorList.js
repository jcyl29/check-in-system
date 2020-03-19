import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleTimeString } from './utils';

const VisitorList = ({ data, signOutVisitor, isFilteredBySignout }) => {
  const rowsToRender = isFilteredBySignout
    ? data.filter(({ signOut }) => signOut)
    : data;

  const noRows = rowsToRender.length === 0;

  const renderSignOutUI = (signOut, loading, id) => {
    const button = loading ? (
      <button className="sign-out loading">
        Signing out <i className="fas fa-spinner" />
      </button>
    ) : (
      <button className="sign-out" onClick={() => signOutVisitor(id)}>
        Sign out
      </button>
    );

    return signOut ? (
      getLocaleTimeString(signOut)
    ) : (
      button
    );
  };

  const renderNoResults = () => <p>No results found</p>;

  const renderRows = () => {
    return rowsToRender.map(({ id, name, notes, signOut, loading }) => {
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{notes}</td>
          <td>{renderSignOutUI(signOut, loading, id)}</td>
        </tr>
      );
    });
  };

  const renderResultsTable = () => (
    <table className="visitor-list">
      <thead>
        <tr>
          <th>Name</th>
          <th>Notes</th>
          <th>Signed out</th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );

  return noRows ? renderNoResults() : renderResultsTable();
};

VisitorList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      notes: PropTypes.string,
      signOut: PropTypes.string
    })
  ).isRequired,
  signOutVisitor: PropTypes.func.isRequired,
  isFilteredBySignout: PropTypes.bool.isRequired
};

export default VisitorList;
