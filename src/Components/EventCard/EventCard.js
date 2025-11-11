import React from "react";
import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <h3>{event.name}</h3>
        <span className={`status ${event.status.toLowerCase()}`}>
          {event.status}
        </span>
      </div>

      <p className="event-date">{event.date}</p>
      <p className="event-location">{event.location}</p>

      <div className="event-card-footer">
        <button className="view-btn">View</button>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default EventCard;
