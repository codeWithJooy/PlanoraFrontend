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
import {
  addSingleGuest,
  getAllGuests,
  getGuestsByEventId,
  guestUpload,
} from "../../redux/actions/guestsAction";
import FloatingMultiSelectInput from "../../Components/FloatingInput/FloatingMultiSelectInput";
import FloatingMultiSelectDropdown from "../../Components/FloatingInput/FloatingMultiSelectDropdown";
import {
  getMembersDrop,
  getSubEventDrop,
  getVendorsDrop,
} from "../../redux/actions/dropdownAction";
import {
  getAllTasksByEvent,
  taskRegister,
} from "../../redux/actions/taskAction";
import { getGuestsDropdown } from "../../redux/actions/dropdownAction";
import {
  fetchMessages,
  messageRegister,
} from "../../redux/actions/messageAction";
import { getAllVendorsEvent } from "../../redux/actions/vendorAction";
import {
  getOverviewGuests,
  getOverviewSubEvents,
  getOverviewTasks,
} from "../../redux/actions/eventAction";
import {
  formatDateWithSuffix,
  formatISODateWithSuffix,
} from "../../Helpers/formatDate";
const EventMain = () => {
  const { eventName } = useSelector((state) => state.singleEvent);
  const [activeTab, setActiveTab] = useState("Overview");
  const [subEventModel, setSubEventModel] = useState(false);
  const [guestModal, setGuestModal] = useState(false);
  const [taskModal, setTaskModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
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
                <p>{eventName}</p>
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
              setActiveTab={setActiveTab}
            />
          )}
          {activeTab === "Sub Events" && (
            <SubEvents setSubEventModel={setSubEventModel} />
          )}
          {activeTab === "Tasks" && <Tasks setTaskModal={setTaskModal} />}
          {activeTab === "Vendors" && <Vendors />}
          {activeTab === "Guests" && <Guests setGuestModal={setGuestModal} />}
          {activeTab === "Messages" && (
            <Messages setMessageModal={setMessageModal} />
          )}
        </div>
      </div>
      {subEventModel && <SubEventModal setSubEventModel={setSubEventModel} />}
      {guestModal && <GuestModal setGuestModal={setGuestModal} />}
      {taskModal && <TaskModal setTaskModal={setTaskModal} />}
      {messageModal && <MessageModal setMessageModal={setMessageModal} />}
    </div>
  );
};

export default EventMain;

const OverviewCard = ({ overviewSubevents, overviewTasks, setActiveTab }) => {
  const {
    orgId,
    eventId,
    eventName,
    eventLocation,
    eventType,
    eventStart,
    eventEnd,
  } = useSelector((state) => state.singleEvent);
  const [subEvents, setSubEvents] = useState([]);
  const [guests, setGuests] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    (async () => {
      const [resSubEvents, restasks, resGuests] = await Promise.all([
        getOverviewSubEvents(eventId),
        getOverviewTasks(eventId),
        getOverviewGuests(eventId),
      ]);
      setSubEvents(resSubEvents);
      setGuests(resGuests);
      setTasks(restasks);
    })();
  }, []);
  return (
    <div className="eventmainsubSection">
      <div className="eventmainoverview">
        <div className="eventoverviewcard">
          <div className="eventoverviewname">
            <p className="overcardEventName">{eventName}</p>
            <p className="overcardEventType">{eventType}</p>
          </div>
          <div className="overviewmain">
            <div className="overviewmainsub">
              <p className="overviewmainsubText"> Location</p>
              <p className="overviewmainText">{eventLocation}</p>
            </div>
            <div className="overviewmainsub">
              <p className="overviewmainsubText">Start Date</p>
              <p className="overviewmainText">
                {formatDateWithSuffix(eventStart)}
              </p>
            </div>
            <div className="overviewmainsub">
              <p className="overviewmainsubText">End Date</p>
              <p className="overviewmainText">
                {formatDateWithSuffix(eventEnd)}
              </p>
            </div>
          </div>
        </div>
        <div className="overviewfull">
          <div className="overviewmainsubpart">
            <div className="subpartHeader">
              <p>Sub Events</p>
            </div>
            <div className="subpartmain">
              {subEvents &&
                subEvents.map((sub, key) => (
                  <div className="subpartUnit">
                    <div className="subpartunittext">
                      <p>{sub.subEventName}</p>
                    </div>
                    <div className="subpartunittag">
                      <span className={`statusTag ${"Pending".toLowerCase()}`}>
                        {"Pending"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="subpartmain">
              <button onClick={() => setActiveTab("Sub Events")}>
                See More
              </button>
            </div>
          </div>

          <div className="overviewmainsubpart">
            <div className="subpartHeader">
              <p>Tasks</p>
            </div>
            <div className="subpartmain">
              {tasks &&
                tasks.map((sub, key) => (
                  <div className="subpartUnit">
                    <div className="subpartunittext">
                      <p>{sub.taskName}</p>
                    </div>
                    <div className="subpartunittag">
                      <span
                        className={`statusTag ${sub.taskStatus.toLowerCase()}`}
                      >
                        {sub.taskStatus}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="subpartmain">
              <button onClick={() => setActiveTab("Tasks")}>See More</button>
            </div>
          </div>
          <div className="overviewmainsubpart">
            <div className="subpartHeader">
              <p>Guests</p>
            </div>
            <div className="subpartmain">
              {guests &&
                guests.map((sub, key) => (
                  <div className="subpartUnit">
                    <div className="subpartunittext">
                      <p>{sub.guestName}</p>
                    </div>
                    <div className="subpartunittag">
                      <span
                        className={`statusTag ${"Attending".toLowerCase()}`}
                      >
                        {"Attending"}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="subpartmain">
              <button onClick={() => setActiveTab("Guests")}>See More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <td>{formatDateWithSuffix(se.subEventStartDate)}</td>
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
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [tasks, setTasks] = useState([]);
  const [fetch, setFetch] = useState(true);

  useState(() => {
    (async () => {
      if (!fetch) return;
      let data = await getAllTasksByEvent({ orgId, eventId });
      setTasks(data);
      setFetch(false);
    })();
  }, []);
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
            <th>Vendor</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={i}>
              <td>{task.taskName}</td>
              <td>{task.tasksubEvent}</td>
              <td>{task.taskMember}</td>
              <td>{task.taskVendor}</td>
              <td>{formatISODateWithSuffix(task.taskDue)}</td>
              <td>
                {/* <span className={`statusTag ${task.status.toLowerCase()}`}>
                  {task.status}
                </span> */}
                {task.taskStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Vendors = () => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [vendors, setVendors] = useState([]);
  useEffect(() => {
    (async () => {
      let data = await getAllVendorsEvent(eventId);
      setVendors(data);
    })();
  }, []);
  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Vendors</h2>
        {/* <button className="addSubEventBtn">+ Add Vendor</button> */}
      </div>

      <table className="subeventTable">
        <thead>
          <tr>
            <th>Vendor</th>
            <th>Sub Event</th>
            <th>Task</th>
            <th>Due</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {vendors &&
            vendors.map((v, i) => (
              <tr key={i}>
                <td>{v.vendorName}</td>
                <td>{v.subEvent}</td>
                <td>{v.task}</td>
                <td>{formatISODateWithSuffix(v.dueDate)}</td>
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
      let data = await getGuestsByEventId(eventId);
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

      {guestsList && guestsList.length === 0 ? (
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

const Messages = ({ setMessageModal }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [messages, setMessages] = useState([]);
  const [fetch, setFetch] = useState(true);
  useEffect(() => {
    (async () => {
      if (!fetch) return;
      let data = await fetchMessages({ orgId, eventId });
      setMessages(data);
      setFetch(false);
    })();
  }, [fetch]);
  return (
    <div className="eventmainsubSection">
      <div className="subeventHeader">
        <h2>Messages</h2>
        <button
          className="addSubEventBtn"
          onClick={() => setMessageModal(true)}
        >
          + Add Message
        </button>
      </div>

      <table className="subeventTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Message</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((v, i) => (
            <tr key={i}>
              <td>{v.messageTitle}</td>
              <td>{v.messageDescription}</td>
              <td>{v.createdAt}</td>
              <td>{v.msgStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
    await addSingleGuest(guestData);
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
    subEventId: "",
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
  const [memberData, setMemberData] = useState([]);
  const [subevent, setSubEvent] = useState([]);

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

  const handleTaskCreate = async () => {
    console.log(taskData);
    await taskRegister(taskData);
    setTaskModal(false);
  };

  useEffect(() => {
    (async () => {
      let venData = await getVendorsDrop(orgId);
      let memberData = await getMembersDrop(orgId);
      let subeventData = await getSubEventDrop(eventId);
      setVendorData(venData);
      setMemberData(memberData);
      setSubEvent(subeventData);
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
          <FloatingSelectInput
            label="Select Sub Event"
            name="subEventId"
            value={taskData.subEventId}
            onChange={handleChange}
            options={subevent}
          />
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
              options={memberData}
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

const MessageModal = ({ setMessageModal }) => {
  const { orgId, eventId } = useSelector((state) => state.singleEvent);
  const [vendorData, setVendorData] = useState([]);
  const [msgData, setMsgData] = useState({
    orgId: orgId,
    eventId: eventId,
    messageTitle: "",
    messageDescription: "",
    messageGuests: [],
    messageEmail: false,
    messageWhatsapp: false,
    messageSms: false,
  });
  const handleChange = (e) => {
    setMsgData({
      ...msgData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setMsgData({
      ...msgData,
      [name]: checked,
    });
  };
  const createMessage = async () => {
    console.log(msgData);
    await messageRegister(msgData);
  };
  useEffect(() => {
    (async () => {
      let venData = await getGuestsDropdown(eventId);
      setVendorData(venData);
    })();
  }, []);
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setMessageModal(false)}
          alt=""
        />
        <div className="modalHeader">
          <p>Create Messsage</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput
            label="Message Title"
            name="messageTitle"
            value={msgData.messageTitle}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <FloatingLabelTextarea
            label="Message"
            name="messageDescription"
            value={msgData.messageDescription}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <FloatingMultiSelectDropdown
            label="Add Guests"
            name="messageGuests"
            value={msgData.messageGuests}
            onChange={handleChange}
            options={vendorData}
          />
        </div>
        <div className="modalUnit" style={{ marginTop: "30px" }}>
          <p className="modalSubHeader">Message Option</p>

          <div className="checkboxGroup">
            <label className="checkboxItem">
              <input
                type="checkbox"
                name="messageEmail"
                checked={msgData.messageEmail}
                onChange={handleCheckboxChange}
              />
              Email
            </label>

            <label className="checkboxItem">
              <input
                type="checkbox"
                name="messageWhatsapp"
                checked={msgData.messageWhatsapp}
                onChange={handleCheckboxChange}
              />
              WhatsApp
            </label>

            <label className="checkboxItem">
              <input
                type="checkbox"
                name="messageSms"
                checked={msgData.messageSms}
                onChange={handleCheckboxChange}
              />
              SMS
            </label>
          </div>
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={createMessage}> Create</button>
        </div>
      </div>
    </div>
  );
};
