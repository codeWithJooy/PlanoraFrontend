import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import VendorsTable from "../../Components/Tables/VendorsTable";
import TeamsTable from "../../Components/Tables/TeamsTable";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";

const Teams = () => {
  const [modal, setModal] = useState(false);
  const teamList = [
    {
      id: 1,
      teamName: "Abhishek",
      teamPhone: "9007453398",
      teamAlternative: "7980651358",
      teamEmail: "abhimicro3@gmail.com",
      teamTasksDue: "10",
    },
  ];
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Teams" />
        <div className="mainPage">
          <Header heading="My Team" />
          <div className="mainContent">
            <div className="eventTabsSection">
              <div className="eventTabButtons">
                <div className="eventTabButton tabSelected">
                  <p>Team List</p>
                </div>
              </div>

              <div className="eventCreateSection">
                <button onClick={() => setModal(true)}>Add Member</button>
              </div>
            </div>
            {teamList.length > 0 && (
              <div className="eventCardSection">
                <TeamsTable teams={teamList} />
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && <TeamModal setModal={setModal} />}
    </div>
  );
};

export default Teams;

const TeamModal = ({ setModal }) => {
  return (
    <div className="pageModal">
      <div className="modal">
        <img
          src="assets/common/close.png"
          className="modalClose"
          onClick={() => setModal(false)}
        />
        <div className="modalHeader">
          <p>Add Member</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput label="Member Name" />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput label="Phone" />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput label="Email" />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput label="Alternative Number" />
          </div>
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button>Create</button>
        </div>
      </div>
    </div>
  );
};
