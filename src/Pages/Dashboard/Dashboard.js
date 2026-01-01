import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "../../global.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import {
  getDashEvents,
  getDashTasks,
} from "../../redux/actions/dashboardAction";
import { useSelector } from "react-redux";
import { formatDateWithSuffix } from "../../Helpers/formatDate";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const { org } = useSelector((state) => state.org);
  // const [tasks, setTasks] = useState([
  //   { id: 1, text: "Confirm venue booking", completed: true },
  //   { id: 2, text: "Send invitations", completed: false },
  //   { id: 3, text: "Book photographer", completed: false },
  // ]);

  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Floral Design",
      events: 2,
      img: "assets/dashboard/floralVendor.jpg",
    },
    {
      id: 2,
      name: "Catering Services",
      events: 3,
      img: "assets/dashboard/cateringVendor.jpeg",
    },
    { id: 3, name: "DJ", events: 1, img: "assets/dashboard/djVendor.jpeg" },
  ]);
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Abhi",
      events: 2,
      img: "assets/dashboard/team1.jpeg",
    },
    {
      id: 2,
      name: "Aditya",
      events: 1,
      img: "assets/dashboard/cook.jpeg",
    },
    { id: 3, name: "Amandeep", events: 4, img: "assets/dashboard/driver.jpeg" },
  ]);
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.taskId === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  useEffect(() => {
    (async () => {
      const [eventData, taskData] = await Promise.all([
        getDashEvents(org.orgId),
        getDashTasks(org.orgId),
      ]);
      console.log("EventData is", eventData);
      setEvents(eventData);
      setTasks(taskData);
    })();
  }, []);
  const allEvents = () => {
    history.push("/events");
  };
  const allTasks = () => {
    history.push("/tasks");
  };
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Dashboard" />
        <div className="mainPage">
          <Header heading="Dashboard" />

          <div className="dashboardContent">
            {/* Title */}
            <div className="dashHeader">
              <h2>
                Hi, Abhi <span>👋</span>
              </h2>
              <p>Welcome to Planora</p>
            </div>

            {/* Upcoming Events + Stats */}
            <div className="dashTopSection">
              <div className="sectionHeader">
                <h3>Events</h3>
                <p className="viewAll" onClick={allEvents}>View All</p>
              </div>
              {events &&
                events.length &&
                events.map((event, key) => (
                  <div className="upcomingCard" key={key}>
                    <img src={event.eventImage} className="eventImage" alt="" />
                    <div className="eventInfo">
                      <h3>{event.eventName}</h3>
                      <p>{formatDateWithSuffix(event.eventStart)}</p>
                    </div>
                    <div className="eventLoc">
                      <p>{event.eventLocation}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Tasks */}
            <div className="tasksSection">
              <div className="sectionHeader">
                <h3>Tasks</h3>
                <p className="viewAll" onClick={allTasks}>View All</p>
              </div>

              <div className="taskList" >
                {tasks.map((task, key) => (
                  <label key={key} className="taskItem">
                    <input
                      type="checkbox"
                      checked={task.completed || false}
                      onChange={() => toggleTask(task.taskId)}
                    />
                    <span className={task.completed ? "taskDone" : ""}>
                      {task.taskName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendors */}
            <div className="memberSection">
              <div className="vendorsSection">
                <h3>Vendors</h3>

                <div className="vendorsGrid">
                  {vendors.map((v) => (
                    <div className="vendorCard" key={v.id}>
                      <img src={v.img} className="vendorImage" alt="" />
                      <div className="vendorInfo">
                        <p className="vendorName">{v.name}</p>
                        <p className="vendorEvents">
                          {v.events} Upcoming events
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Members */}
              <div className="vendorsSection">
                <h3>My Team</h3>

                <div className="vendorsGrid">
                  {members.map((v) => (
                    <div className="vendorCard" key={v.id}>
                      <img src={v.img} className="vendorImage" alt="" />
                      <div className="vendorInfo">
                        <p className="vendorName">{v.name}</p>
                        <p className="vendorEvents">
                          {v.events} Upcoming events
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
