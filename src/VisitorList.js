import React from 'react';
import PropTypes from 'prop-types';

const VisitorList = ({ data, signOutVisitor }) => {
  const renderSignOutUI = (signOut, id) => {
    return signOut ? (
      signOut
    ) : (
      <button onClick={() => signOutVisitor(id)}>Sign out</button>
    );
  };

  const renderRows = () =>
    data.map(({ id, name, notes, signOut }) => {
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{notes}</td>
          <td>{renderSignOutUI(signOut, id)}</td>
        </tr>
      );
    });
  return (
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
  signOutVisitor: PropTypes.func.isRequired
};

export default VisitorList;
