import React, { useState, useEffect } from "react";

import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Events.css";
import EventCard from "../../Components/EventCard/EventCard";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingDateInput from "../../Components/FloatingInput/FloatingDateInput";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatLabelTextArea from "../../Components/FloatingInput/FLoatingLabelTextArea";
import Header from "../../Components/Header/Header";
import EventTable from "../../Components/Tables/EventTable";
import {
  eventRegister,
  getAllEvents,
  getSingleEvent,
} from "../../redux/actions/eventAction";
import { useSelector } from "react-redux";

const Events = () => {
  const { org } = useSelector((state) => state.org);
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [events, setEvents] = useState([]);
  const [eventData, setEventId] = useState({
    orgId: org.orgId,
    eventName: "",
    eventType: "",
    eventLocation: "",
    eventStart: "",
    eventEnd: "",
    eventDescription: "",
  });



  useEffect(() => {
    (async () => {
      if (modal) return;
      let data = await getAllEvents();
      if (data) {
        setEvents(data);
      }
    })();
  }, [modal]);
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Events" />
        <div className="mainPage">
          <Header />

          <div className="mainContent">
            <div className="eventTabsSection">
              <div className="eventTabButtons">
                <div
                  className={`eventTabButton ${toggle ? "tabSelected" : ""}`}
                  onClick={() => setToggle(true)}
                >
                  <p>Card View</p>
                </div>
                <div
                  className={`eventTabButton ${toggle ? "" : "tabSelected"}`}
                  onClick={() => setToggle(false)}
                >
                  <p>Table View</p>
                </div>
              </div>
              <div className="eventCreateSection">
                <button onClick={() => setModal(true)}> Create Event</button>
              </div>
            </div>
            {events.length > 0 && (
              <div className="eventCardSection">
                {/* {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))} */}
                {toggle &&
                  events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                {!toggle && <EventTable events={events} />}
              </div>
            )}
            {!events.length && (
              <div className="eventEmptySection">
                <p>No Event Created</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && <EventModal setModal={setModal} org={org} />}
    </div>
  );
};

export default Events;

const EventModal = ({ setModal, org }) => {
  const [eventData, setEventData] = useState({
    orgId: org.orgId,
    eventName: "",
    eventType: "",
    eventLocation: "",
    eventStart: "",
    eventEnd: "",
    eventDescription: "",
  });
  const eventType = ["Wedding", "BirthDay", "Conference"];
  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEventRegister = async () => {
    await eventRegister(eventData);
    setModal(false);
  };
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setModal(false)}
          alt=""
        />
        <div className="modalHeader">
          <p>Create Event</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput
            label="Event Name"
            name="eventName"
            value={eventData.eventName}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingSelectInput
              label="Event Type"
              options={eventType}
              name="eventType"
              value={eventData.eventType}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Event Location"
              name="eventLocation"
              value={eventData.eventLocation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingDateInput
              label="Start Date"
              name="eventStart"
              value={eventData.eventStart}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingDateInput
              label="End Date"
              name="eventEnd"
              value={eventData.eventEnd}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <FloatLabelTextArea
            label="Event Description"
            name="eventDescription"
            value={eventData.eventDescription}
            onChange={handleChange}
          />
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleEventRegister}>Create</button>
        </div>
      </div>
    </div>
  );
};
