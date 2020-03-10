import React, { useState } from "react";

const VisitorList = ({ data }) => {
  const renderRows = () =>
    data.map(({ name, notes, signOut }) => {
      return (
        <tr>
          <td>{name}</td>
          <td>{notes}</td>
          <td>{signOut || 'did not sign out yet'}</td>
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

export default VisitorList;
