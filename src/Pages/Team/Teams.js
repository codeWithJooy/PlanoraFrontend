import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import VendorsTable from "../../Components/Tables/VendorsTable";
import TeamsTable from "../../Components/Tables/TeamsTable";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FLoatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import { useSelector } from "react-redux";
import { getAllMembers, teamRegister } from "../../redux/actions/teamAction";

const Teams = () => {
  const { org } = useSelector((state) => state.org);
  const [fetchData, setFetchData] = useState(true);
  const [modal, setModal] = useState(false);
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    (async () => {
      if (!fetchData) return;
      let data = await getAllMembers(org.orgId);
      setTeamList(data);
      setFetchData(false);
    })();
  }, [fetchData]);
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
            {teamList && teamList.length > 0 && (
              <div className="eventCardSection">
                <TeamsTable teams={teamList} />
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <TeamModal setModal={setModal} org={org} setFetchData={setFetchData} />
      )}
    </div>
  );
};

export default Teams;

const TeamModal = ({ setModal, org, setFetchData }) => {
  const designation = ["Event Operations Manager","Event Coordinator","Event Assistant"];
  const [teamData, setTeamData] = useState({
    orgId: org.orgId,
    memberName: "",
    memberPhone: "",
    memberAlternative: "",
    memberEmail: "",
    memberDesignation: "",
  });
  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };
  const handleTeamRegister = async () => {
    await teamRegister(teamData);
    setFetchData(true);
    setModal(false);
  };
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
          <FloatingLabelInput
            label="Member Name"
            name="memberName"
            value={teamData.memberName}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Phone"
              name="memberPhone"
              value={teamData.memberPhone}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Email"
              name="memberEmail"
              value={teamData.memberEmail}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FLoatingSelectInput
              label="Designation"
              name="memberDesignation"
              value={teamData.memberDesignation}
              options={designation}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Alternative Number"
              name="memberAlternative"
              value={teamData.memberAlternative}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleTeamRegister}>Create</button>
        </div>
      </div>
    </div>
  );
};
