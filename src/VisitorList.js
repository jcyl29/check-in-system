import React from 'react';
import PropTypes from 'prop-types';
import { getLocaleDateString } from './utils';

const VisitorList = ({ data, signOutVisitor, isFilteredBySignout }) => {
  const renderSignOutUI = (signOut, id) => {
    return signOut ? (
      getLocaleDateString(signOut)
    ) : (
      <button onClick={() => signOutVisitor(id)}>Sign out</button>
    );
  };

  const noRows = data.length === 0;

  const renderNoResults = () => <p>No results found</p>;

  const renderRows = () => {
    const result = isFilteredBySignout
      ? data.filter(({ signOut }) => signOut)
      : data;

    return result.map(({ id, name, notes, signOut }) => {
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{notes}</td>
          <td>{renderSignOutUI(signOut, id)}</td>
        </tr>
      );
    });
  };

  const renderResultsTable = () => (
    <table>
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
