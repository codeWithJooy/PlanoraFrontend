import React from "react";
import { useHistory } from "react-router-dom";
import "./EventCard.css";
import { getSingleEvent } from "../../redux/actions/eventAction";

const EventCard = ({ event }) => {
  const history = useHistory();

  const handleCardClick = async (eventId) => {
    await getSingleEvent(event.eventId);
    history.push("/eventmain");
  };
  return (
    <div className="event-card" onClick={handleCardClick}>
      <div className="eventImageSection">
        <img src={event.eventImage} />
      </div>

      <div className="event-title-row">
        <h3 className="event-title">{event.eventName}</h3>
        <span className={`status ${event.status.toLowerCase()}`}>
          {event.status}
        </span>
      </div>

      <div className="event-info-row">
        <p className="event-date">{event.eventStart}</p>
        <span className="separator">•</span>
        <p className="event-location">{event.eventLocation}</p>
      </div>

      <div className="event-card-footer">
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </div>
    </div>
  );
};

export default EventCard;
