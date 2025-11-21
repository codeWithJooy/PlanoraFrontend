import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingDateInput from "../../Components/FloatingInput/FloatingDateInput";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatLabelTextArea from "../../Components/FloatingInput/FLoatingLabelTextArea";
import TaskTable from "../../Components/Tables/TaskTable";

const Tasks = () => {
  const [toggle, setToggle] = useState(true);
  const [modal, setModal] = useState(false);
  const [temmplateModal, setTemplateModal] = useState(false);
  const tasksList = [
    {
      id: 1,
      taskName: "Book Venue",
      eventName: "Annual Meetup",
      subEventName: "Registration",
      dueDate: "2025-02-10",
      status: "Pending"
    }
  ];
  
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Tasks" />
        <div className="mainPage">
          <Header heading="Tasks" />

          <div className="mainContent">
            <div className="eventTabsSection">
              <div className="eventTabButtons">
                <div
                  className={`eventTabButton ${toggle ? "tabSelected" : ""}`}
                  onClick={() => setToggle(true)}
                >
                  <p>Tasks List</p>
                </div>
                <div
                  className={`eventTabButton ${toggle ? "" : "tabSelected"}`}
                  onClick={() => setToggle(false)}
                >
                  <p>Templates</p>
                </div>
              </div>
              {toggle && (
                <div className="eventCreateSection">
                  <button onClick={() => setModal(true)}>Create Task</button>
                </div>
              )}
              {!toggle && (
                <div className="eventCreateSection">
                  <button onClick={() => setTemplateModal(true)}>
                    Create Template
                  </button>
                </div>
              )}
            </div>
           {
            tasksList.length > 0 && (
              <div className="eventCardSection">
                <TaskTable tasks={tasksList}/>
              </div>
            )
           }
          </div>
        </div>
      </div>
      {temmplateModal && <TemplateModal setTemplateModal={setTemplateModal} />}
    </div>
  );
};

export default Tasks;

const TemplateModal = ({ setTemplateModal }) => {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const [fields, setFields] = useState([
    { type: "", label: "" }, // initial row
  ]);

  // Add new field row
  const addField = () => {
    setFields([...fields, { type: "", label: "" }]);
  };

  // Update single field
  const updateField = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  // Create template JSON
  const createTemplate = () => {
    const finalJson = {
      templateName,
      templateDescription,
      fields,
    };

    console.log("FINAL JSON:", finalJson);

    // You can call API here...
    // await axios.post('/api/template', finalJson)

    setTemplateModal(false);
  };

  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setTemplateModal(false)}
          alt=""
        />

        <div className="modalHeader">
          <p>Create Task Template</p>
        </div>

        <div className="modalUnit">
          <FloatingLabelInput
            label="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
        </div>

        <div className="modalUnit">
          <FloatLabelTextArea
            label="Template Description"
            value={templateDescription}
            onChange={(e) => setTemplateDescription(e.target.value)}
          />
        </div>

        <div className="field">
          <p>Fields</p>
        </div>

        {/* Dynamic Fields */}
        <div className="fieldSection">
          {fields.map((field, index) => (
            <div className="fieldUnit" key={index}>
              <div className="fieldType">
                <FloatingSelectInput
                  label="Field Type"
                  value={field.type}
                  onChange={(e) => updateField(index, "type", e.target.value)}
                />
              </div>
              <div className="fieldLabel">
                <FloatingLabelInput
                  label="Field Label"
                  value={field.label}
                  onChange={(e) => updateField(index, "label", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="fieldAdd">
          <button onClick={addField}>Add Field</button>
        </div>

        <div className="modalButtonSection">
          <button onClick={() => setTemplateModal(false)}>Cancel</button>
          <button onClick={createTemplate}>Create</button>
        </div>
      </div>
    </div>
  );
};
