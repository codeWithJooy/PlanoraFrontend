import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import VendorsTable from "../../Components/Tables/VendorsTable";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";

const Vendors = () => {
  const [modal,setModal]=useState(false)
  const vendorList = [
    {
      id: 1,
      vendorName: "Abhishek",
      vendorPhone: "9007453398",
      vendorAlternative: "7980651358",
      vendorEmail: "abhimicro3@gmail.com",
      vendorCategory: "Catering",
      vendorTasksDue:"10"
    },
  ];
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Vendors" />
        <div className="mainPage">
          <Header heading="Vendors" />
          <div className="mainContent">
            <div className="eventTabsSection">
              <div className="eventTabButtons">
                <div
                  className="eventTabButton tabSelected" 
                >
                  <p>Vendors List</p>
                </div>
              </div>

                <div className="eventCreateSection">
                  <button onClick={() => setModal(true)}>Add Vendor</button>
                </div>
            </div>
            {
            vendorList.length > 0 && (
              <div className="eventCardSection">
                <VendorsTable vendors={vendorList}/>
              </div>
            )
           }
          </div>
        </div>
      </div>
      {modal && <VendorModal setModal={setModal}/>}
    </div>
  );
};

export default Vendors;

const VendorModal = ({ setModal }) => {
    return (
      <div className="pageModal">
        <div className="modal">
          <img
            src="assets/common/close.png"
            className="modalClose"
            onClick={() => setModal(false)}
          />
          <div className="modalHeader">
            <p>Add Vendor</p>
          </div>
          <div className="modalUnit">
            <FloatingLabelInput label="Vendor Name" />
          </div>
          <div className="modalUnit">
            <div className="modalUnitHalf">
              <FloatingLabelInput label="Phone" />
            </div>
            <div className="modalUnitHalf">
              <FloatingLabelInput label="Alternative Number" />
            </div>
          </div>
          <div className="modalUnit">
            <div className="modalUnitHalf">
              <FloatingLabelInput label="Email" />
            </div>
            <div className="modalUnitHalf">
              <FloatingSelectInput label="Vendor Category"/>
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