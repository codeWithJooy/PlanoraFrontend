import React from "react";
import "./table.css";

const TeamsTable = ({ teams }) => {
  return (
    <div className="table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Alternative Number</th>
            <th>Email</th>
            <th>Designation</th>
          </tr>
        </thead>

        <tbody>
          {teams.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No Member found
              </td>
            </tr>
          ) : (
            teams.map((team) => (
              <tr key={team.id}>
                <td>{team.memberName}</td>
                <td>{team.memberPhone}</td>
                <td>{team.memberAlternative}</td>
                <td>{team.memberEmail}</td>
                <td>{team.memberDesignation}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
