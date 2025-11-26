import React from "react";
import "./table.css";

const EventTable = ({ events }) => {
  return (
    <div className="table-container">
      <table className="events-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {events.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">No events found</td>
            </tr>
          ) : (
            events.map((event) => (
              <tr key={event.enentId}>
                <td>{event.eventName}</td>
                <td>{event.eventStart}</td>
                <td>{event.eventLocation}</td>
                <td>
                  <span className={`status ${event.status.toLowerCase()}`}>
                    {event.status}
                  </span>
                </td>
                <td className="actions">
                  <button className="view-btn">View</button>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventTable;
