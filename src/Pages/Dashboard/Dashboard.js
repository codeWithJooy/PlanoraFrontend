import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import "../../global.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Confirm venue booking", completed: true },
    { id: 2, text: "Send invitations", completed: false },
    { id: 3, text: "Book photographer", completed: false },
  ]);

  const [vendors, setVendors] = useState([
    { id: 1, name: "Floral Design", events: 2, img: "assets/vendors/floral.jpg" },
    { id: 2, name: "Catering Services", events: 3, img: "assets/vendors/catering.jpg" },
    { id: 3, name: "DJ", events: 1, img: "assets/vendors/dj.jpg" },
  ]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Dashboard" />
        <div className="mainPage">
          <Header heading="Dashboard"/>

          <div className="dashboardContent">
            {/* Title */}
            <div className="dashHeader">
              <h2>
                Hi, Priya <span>👋</span>
              </h2>
              <p>Welcome to Planora</p>
            </div>

            {/* Upcoming Events + Stats */}
            <div className="dashTopSection">
              <div className="upcomingCard">
                <img
                  src="assets/events/wedding.jpg"
                  className="eventImage"
                  alt=""
                />
                <div className="eventInfo">
                  <h3>Wedding Ceremony</h3>
                  <p>November 15</p>
                </div>
              </div>

              <div className="dashStatsCard">
                <h1>0</h1>
                <p>Events</p>
              </div>

              <div className="dashStatsCard">
                <h1>0</h1>
                <p>Staff</p>
              </div>
            </div>

            {/* Tasks */}
            <div className="tasksSection">
              <div className="sectionHeader">
                <h3>Tasks</h3>
                <p className="viewAll">View All</p>
              </div>

              <div className="taskList">
                {tasks.map((task) => (
                  <label key={task.id} className="taskItem">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                    />
                    <span className={task.completed ? "taskDone" : ""}>
                      {task.text}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Vendors */}
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
