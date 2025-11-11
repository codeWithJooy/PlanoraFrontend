import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import "./Events.css";
import EventCard from "../../Components/EventCard/EventCard";
import EventTable from "../../Components/EventTable/EventTable";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingDateInput from "../../Components/FloatingInput/FloatingDateInput";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatLabelTextArea from "../../Components/FloatingInput/FLoatingLabelTextArea";

const Events = () => {
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const events = [
    {
      id: 1,
      name: "Wedding Ceremony",
      date: "Nov 15, 2025",
      location: "Goa, India",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Corporate Meetup",
      date: "Dec 1, 2025",
      location: "Bangalore, India",
      status: "Upcoming",
    },
  ];
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar />
        <div className="mainPage">
          <div className="mainHeader">
            <div className="pagePath">
              <p>Events</p>
            </div>
            <div className="pageUser">
              <img src="assets/Header/user.jpg" className="userIcon" />
              <p>Abhi Hazra</p>
              <img src="assets/Header/dropdown.png" className="userDropdown" />
            </div>
          </div>

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
            {
              !events.length && 
              <div className="eventEmptySection">
                <p>No Event Created</p>
              </div>
            }
          </div>
        </div>
      </div>
      {modal && <EventModal setModal={setModal} />}
    </div>
  );
};

export default Events;

const EventModal = ({ setModal }) => {
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setModal(false)}
        />
        <div className="modalHeader">
          <p>Create Event</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput label="Event Name" />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingSelectInput label="Event Type" />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput label="Event Location" />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingDateInput label="Start Date" />
          </div>
          <div className="modalUnitHalf">
            <FloatingDateInput label="End Date" />
          </div>
        </div>
        <div className="modalUnit">
          <FloatLabelTextArea label="Event Description" />
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button>Create</button>
        </div>
      </div>
    </div>
  );
};
