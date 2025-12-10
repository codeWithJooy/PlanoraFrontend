import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./EventMain.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatingDateInput from "../../Components/FloatingInput/FloatingDateInput";
import FloatingTimeInput from "../../Components/FloatingInput/FLoatingTimeInput";
import FloatingLabelTextarea from "../../Components/FloatingInput/FLoatingLabelTextArea";
import { subEventRegister } from "../../redux/actions/subEventAction";
import { useSelector } from "react-redux";
import { getAllSubEvents } from "../../redux/actions/subEventAction";
import { getAllGuests, guestUpload } from "../../redux/actions/guestsAction";
import FloatingMultiSelectInput from "../../Components/FloatingInput/FloatingMultiSelectInput";
import FloatingMultiSelectDropdown from "../../Components/FloatingInput/FloatingMultiSelectDropdown";
import { getVendorsDrop } from "../../redux/actions/dropdownAction";

const EventMain = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [subEventModel, setSubEventModel] = useState(false);
  const [guestModal, setGuestModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const tabs = [
    "Overview",
    "Guests",
    "Sub Events",
    "Tasks",
    "Vendors",
    "Messages",
  ];
  const overviewSubevents = [
    {
      name: "Mehendi Ceremony",
      status: "Ongoing",
    },
    {
      name: "Sangeet Ceremony",
      status: "Planned",
    },
    {
      name: "Sath Pehere",
      status: "Pending",
    },
  ];
  const overviewTasks = [
    {
      name: "Pickup Guests From Station",
      status: "Ongoing",
    },
    {
      name: "Allot Room To Guest",
      status: "Planned",
    },
    {
      name: "Serve Dinner",
      status: "Pending",
    },
  ];
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Events" />
        <div className="mainPage">
          <div className="eventOverview">
            <div className="eventmaintitlesection">
              <div className="eventmainTitle">
                <p>Hemant & Neetu Wedding</p>
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
          {activeTab === "Overview" && (
            <OverviewCard
              overviewSubevents={overviewSubevents}
              overviewTasks={overviewTasks}
            />
          )}
          {activeTab === "Sub Events" && (
            <SubEvents setSubEventModel={setSubEventModel} />
          )}
          {activeTab === "Tasks" && <Tasks setTaskModal={setTaskModal} />}
          {activeTab === "Vendors" && <Vendors />}
          {activeTab === "Guests" && <Guests setGuestModal={setGuestModal} />}
        </div>
      </div>
      {subEventModel && <SubEventModal setSubEventModel={setSubEventModel} />}
      {guestModal && <GuestModal setGuestModal={setGuestModal} />}
      {taskModal && <TaskModal setTaskModal={setTaskModal} />}
    </div>
  );
};

export default EventMain;

const OverviewCard = ({ overviewSubevents, overviewTasks }) => (
  <div className="eventmainsubSection">
    <div className="eventmainoverview">
      <div className="eventoverviewcard">
        <div className="eventoverviewname">
          <p className="overcardEventName">Hemant & Neetu Wedding</p>
          <p className="overcardEventType">Wedding</p>
        </div>
        <div className="overviewmain">
          <div className="overviewmainsub">
            <p className="overviewmainsubText"> Location</p>
            <p className="overviewmainText">Kolkata</p>
          </div>
          <div className="overviewmainsub">
            <p className="overviewmainsubText">Start Date</p>
            <p className="overviewmainText">Jan 20,2026</p>
          </div>
          <div className="overviewmainsub">
            <p className="overviewmainsubText">End Date</p>
            <p className="overviewmainText">Jan 20,2026</p>
          </div>
        </div>
      </div>
      <div className="overviewfull">
        <div className="overviewmainsubpart">
          <div className="subpartHeader">
            <p>Sub Events</p>
          </div>
          <div className="subpartmain">
            {overviewSubevents &&
              overviewSubevents.map((sub, key) => (
                <div className="subpartUnit">
                  <div className="subpartunittext">
                    <p>{sub.name}</p>
                  </div>
                  <div className="subpartunittag">
                    <span className={`statusTag ${sub.status.toLowerCase()}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="subpartmain">
            <button>See More</button>
          </div>
        </div>

        <div className="overviewmainsubpart">
          <div className="subpartHeader">
            <p>Tasks</p>
          </div>
          <div className="subpartmain">
            {overviewTasks &&
              overviewTasks.map((sub, key) => (
                <div className="subpartUnit">
                  <div className="subpartunittext">
                    <p>{sub.name}</p>
                  </div>
                  <div className="subpartunittag">
                    <span className={`statusTag ${sub.status.toLowerCase()}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="subpartmain">
            <button>See More</button>
          </div>
        </div>
        <div className="overviewmainsubpart">
          <div className="subpartHeader">
            <p>Vendors</p>
          </div>
          <div className="subpartmain">
            {overviewSubevents &&
              overviewSubevents.map((sub, key) => (
                <div className="subpartUnit">
                  <div className="subpartunittext">
                    <p>{sub.name}</p>
                  </div>
                  <div className="subpartunittag">
                    <span className={`statusTag ${sub.status.toLowerCase()}`}>
                      {sub.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
          <div className="subpartmain">
            <button>See More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const SubEvents = ({ setSubEventModel }) => {
  const { eventId } = useSelector((state) => state.singleEvent);
  const [subEvents, setSubEvents] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await getAllSubEvents(eventId);
      setSubEvents(data);
    })();
  }, []);
  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Sub Events</h2>
        <button
          className="addSubEventBtn"
          onClick={() => setSubEventModel(true)}
        >
          + Add Sub Event
        </button>
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
              <td>{se.subEventName}</td>
              <td>{se.subEventStartDate}</td>
              <td>{se.subEventLocation}</td>
              <td>
                <span className={`statusTag ${"Pending".toLowerCase()}`}>
                  {"Pending"}
                </span>
              </td>
              <td>{se.tasks || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tasks = ({ setTaskModal }) => {
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
        <button
          className="addSubEventBtn"
          onClick={() => {
            setTaskModal(true);
          }}
        >
          + Add Task
        </button>
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

const Guests = ({ setGuestModal }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [guestsList, setGuestsList] = React.useState([]);
  const [fetchData, setFetchData] = useState(true);
  const fileInputRef = React.useRef();

  const handleCSVClick = () => {
    fileInputRef.current.click();
  };

  const handleCSVUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    parseCSV(file);
  };

  const parseCSV = async (file) => {
    const parsedData = await new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          resolve(results.data);
        },
        error: function (err) {
          reject(err);
        },
      });
    });

    console.log("Parsed CSV", parsedData);

    await guestUpload({
      orgId,
      eventId,
      guests: parsedData,
    });
    setFetchData(true);
  };

  useEffect(() => {
    (async () => {
      if (!fetchData) return;
      let data = await getAllGuests();
      setGuestsList(data);
      setFetchData(false);
    })();
  }, [fetchData]);

  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Guests</h2>
        <button className="addSubEventBtn" onClick={() => setGuestModal(true)}>
          + Add Guest
        </button>
      </div>

      {guestsList.length === 0 ? (
        <div className="noGuestsContainer">
          <p className="noGuestsText">No Guests Added</p>

          <button className="uploadGuestsBtn" onClick={handleCSVClick}>
            Upload Guests (CSV)
          </button>

          {/* Hidden Input */}
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleCSVUpload}
          />
        </div>
      ) : (
        <table className="subeventTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {guestsList.map((v, i) => (
              <tr key={i}>
                <td>{v.guestName}</td>
                <td>{v.guestAge}</td>
                <td>{v.guestPhone}</td>
                <td>{v.guestEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const SubEventModal = ({ setSubEventModel }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [subEventData, setSubEventData] = useState({
    orgId: orgId,
    eventId: eventId,
    subEventName: "",
    subEventType: "",
    subEventLocation: "",
    subEventStartDate: "",
    subEventStartTime: "",
    subEventEndDate: "",
    subEventEndTime: "",
    subEventDescription: "",
  });
  const eventType = ["Wedding", "BirthDay", "Conference"];
  const handleChange = (e) => {
    setSubEventData({
      ...subEventData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubEventRegister = async () => {
    await subEventRegister(subEventData);
    setSubEventModel(false);
  };
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setSubEventModel(false)}
          alt=""
        />
        <div className="modalHeader">
          <p>Create Sub Event</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput
            label="Sub Event Name"
            name="subEventName"
            value={subEventData.subEventName}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingSelectInput
              label="Sub Event Type"
              options={eventType}
              name="subEventType"
              value={subEventData.subEventType}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Sub Event Location"
              name="subEventLocation"
              value={subEventData.subEventLocation}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingDateInput
              label="Start Date"
              name="subEventStartDate"
              value={subEventData.subEventStartDate}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingTimeInput
              label="Start Time"
              name="subEventStartTime"
              value={subEventData.subEventStartTime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingDateInput
              label="End Date"
              name="subEventEndDate"
              value={subEventData.subEventEndDate}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingTimeInput
              label="End Time"
              name="subEventEndTime"
              value={subEventData.subEventEndime}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <FloatingLabelTextarea
            label="Event Description"
            name="subEventDescription"
            value={subEventData.subEventDescription}
            onChange={handleChange}
          />
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleSubEventRegister}>Create</button>
        </div>
      </div>
    </div>
  );
};

const GuestModal = ({ setGuestModal }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [guestData, setGuestData] = useState({
    orgId: orgId,
    eventId: eventId,
    guestName: "",
    guestAge: "",
    guestPhone: "",
    guestEmail: "",
  });

  const handleChange = (e) => {
    setGuestData({
      ...guestData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubEventRegister = async () => {
    //await subEventRegister(subEventData);
    setGuestModal(false);
  };
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setGuestModal(false)}
          alt=""
        />
        <div className="modalHeader">
          <p>Add Guest</p>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Guest Name"
              name="guestName"
              value={guestData.guestName}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Guest Age"
              name="guestAge"
              value={guestData.guestAge}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Guest Phone"
              name="guestPhone"
              value={guestData.guestPhone}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Guest Email"
              name="guestEmail"
              value={guestData.guestEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleSubEventRegister}>Create</button>
        </div>
      </div>
    </div>
  );
};

const TaskModal = ({ setTaskModal }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [taskData, setTaskData] = useState({
    orgId: orgId,
    eventId: eventId,
    taskName: "",
    taskDescription: "",
    taskDue: "",
    taskMembers: [],
    taskVendors: [],
    taskMsgMember: "",
    taskMsgVendor: "",
    taskStatus: "Created",
  });
  const [vendorData, setVendorData] = useState([]);

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };
  // const handleSubEventRegister = async () => {
  //   await subEventRegister(subEventData);
  //   setSubEventModel(false);
  // };

  const handleTaskCreate = () => {
    console.log(taskData);
  };
  useEffect(() => {
    (async () => {
      let venData = await getVendorsDrop();
      setVendorData(venData);
    })();
  }, []);
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setTaskModal(false)}
          alt=""
        />
        <div className="modalHeader">
          <p>Create Task</p>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Task Name"
              name="taskName"
              value={taskData.taskName}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingDateInput
              label="Task Due Date"
              name="taskDue"
              value={taskData.taskDue}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingMultiSelectDropdown
              label="Task Vendors"
              name="taskVendors"
              value={taskData.taskVendors}
              onChange={handleChange}
              options={vendorData}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Message For Vendors"
              name="taskMsgVendor"
              value={taskData.taskMsgVendor}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingMultiSelectDropdown
              label="Task Members"
              name="taskMembers"
              value={taskData.taskMembers}
              onChange={handleChange}
              options={vendorData}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Message For Members"
              name="taskMsgMember"
              value={taskData.taskMsgMember}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <FloatingLabelTextarea
            label="Task Description"
            name="taskDescription"
            value={taskData.taskDescription}
            onChange={handleChange}
          />
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleTaskCreate}>Create</button>
        </div>
      </div>
    </div>
  );
};
