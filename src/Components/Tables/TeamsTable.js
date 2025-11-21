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
            <th>Task Due</th>
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
                <td>{team.teamName}</td>
                <td>{team.teamPhone}</td>
                <td>{team.teamAlternative}</td>
                <td>{team.teamEmail}</td>
                <td>{team.teamTasksDue}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TeamsTable;
