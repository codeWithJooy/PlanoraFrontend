import React, { useState, useEffect } from "react";
import "./EventMain.css";
import Sidebar from "../../Components/Sidebar/Sidebar";

const EventMain = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const tabs = ["Overview", "Sub Events", "Tasks", "Vendors", "Guests"];

  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar />
        <div className="mainPage">
          <div className="eventOverview">
            <div className="eventmaintitlesection">
              <div className="eventmainTitle">
                <p>Event Name</p>
              </div>
              <div className="eventmainsub">
                {tabs.map((tab) => (
                  <div
                    key={tab}
                    className={`eventsub ${
                      activeTab === tab ? "eventsubselected" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    <p>{tab}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="eventmainbutton">
              <button>Edit Event</button>
            </div>
          </div>
          {/* Conditional rendering */}
          {activeTab === "Overview" && <OverviewCard />}
          {activeTab === "Sub Events" && <SubEvents />}
          {activeTab === "Tasks" && <Tasks />}
          {activeTab === "Vendors" && <Vendors />}
          {activeTab === "Guests" && <Guests />}
        </div>
      </div>
      
    </div>
  );
};

export default EventMain;

const OverviewCard = () => (
  <div className="eventmainsubSection">
    <div className="eventmainoverview">
      <div className="eventoverviewcard">
        <div className="eventoverviewname">
          <p className="overcardEventName">Event Name</p>
          <p className="overcardEventType">Event Type</p>
          <div className="eventoverviewstatus">
            <p>Status</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SubEvents = () => {
  const subEvents = [
    {
      name: "Opening Ceremony",
      date: "2025-12-10",
      location: "Main Hall",
      status: "Planned",
      tasks: "5 Tasks",
    },
    {
      name: "Workshop: AI in 2025",
      date: "2025-12-11",
      location: "Auditorium B",
      status: "Ongoing",
      tasks: "8 Tasks",
    },
    {
      name: "Closing Gala",
      date: "2025-12-12",
      location: "Banquet Hall",
      status: "Pending",
      tasks: "3 Tasks",
    },
  ];

  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Sub Events</h2>
        <button className="addSubEventBtn">+ Add Sub Event</button>
      </div>

      <table className="subeventTable">
        <thead>
          <tr>
            <th>Sub-Event</th>
            <th>Date</th>
            <th>Location</th>
            <th>Status</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {subEvents.map((se, i) => (
            <tr key={i}>
              <td>{se.name}</td>
              <td>{se.date}</td>
              <td>{se.location}</td>
              <td>
                <span className={`statusTag ${se.status.toLowerCase()}`}>
                  {se.status}
                </span>
              </td>
              <td>{se.tasks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tasks = () => {
  const tasks = [
    {
      task: "Book Venue",
      subEvent: "Opening Ceremony",
      assignedTo: "John Doe",
      due: "2025-11-25",
      status: "Completed",
    },
    {
      task: "Send Invitations",
      subEvent: "Workshop: AI in 2025",
      assignedTo: "Sarah Lee",
      due: "2025-11-28",
      status: "Progress",
    },
    {
      task: "Arrange Catering",
      subEvent: "Closing Gala",
      assignedTo: "Michael Chen",
      due: "2025-12-01",
      status: "Pending",
    },
  ];

  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Tasks</h2>
        <button className="addSubEventBtn">+ Add Task</button>
      </div>

      <table className="subeventTable">
        <thead>
          <tr>
            <th>Task</th>
            <th>Sub Event</th>
            <th>Assigned To</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>{task.task}</td>
              <td>{task.subEvent}</td>
              <td>{task.assignedTo}</td>
              <td>{task.due}</td>
              <td>
                <span className={`statusTag ${task.status.toLowerCase()}`}>
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Vendors = () => {
  const vendors = [
    {
      vendor: "Decor Co.",
      subEvent: "Opening Ceremony",
      due: "2025-11-20",
      status: "Completed",
    },
    {
      vendor: "Food & Drinks Inc.",
      subEvent: "Closing Gala",
      due: "2025-11-28",
      status: "Pending",
    },
    {
      vendor: "Tech AV Solutions",
      subEvent: "Workshop: AI in 2025",
      due: "2025-11-25",
      status: "In Progress",
    },
  ];

  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Vendors</h2>
        <button className="addSubEventBtn">+ Add Vendor</button>
      </div>

      <table className="subeventTable">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Sub Event</th>
            <th>Due</th>8<th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v, i) => (
            <tr key={i}>
              <td>{v.vendor}</td>
              <td>{v.subEvent}</td>
              <td>{v.due}</td>
              <td>
                <span
                  className={`statusTag ${v.status
                    .toLowerCase()
                    .replace(" ", "")}`}
                >
                  {v.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Guests = () => (
  <div className="eventmainsubSection">
    <p>Guests Section</p>
  </div>
);
