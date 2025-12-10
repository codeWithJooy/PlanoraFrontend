import React, { useEffect, useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";
import VendorsTable from "../../Components/Tables/VendorsTable";
import FloatingSelectInput from "../../Components/FloatingInput/FloatingSelectInput";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import { useSelector } from "react-redux";
import {
  getAllVendors,
  vendorRegister,
} from "../../redux/actions/vendorAction";

const Vendors = () => {
  const { org } = useSelector((state) => state.org);
  const [fetchData, setFetchData] = useState(true);
  const [modal, setModal] = useState(false);
  const [vendorList, setVendorList] = useState([]);

  useEffect(() => {
    (async () => {
      if (!fetchData) return;
      let data = await getAllVendors(org.orgId);
      setVendorList(data);
      setFetchData(false);
    })();
  }, [fetchData]);
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Vendors" />
        <div className="mainPage">
          <Header heading="Vendors" />
          <div className="mainContent">
            <div className="eventTabsSection">
              <div className="eventTabButtons">
                <div className="eventTabButton tabSelected">
                  <p>Vendors List</p>
                </div>
              </div>

              <div className="eventCreateSection">
                <button onClick={() => setModal(true)}>Add Vendor</button>
              </div>
            </div>
            {vendorList && vendorList.length > 0 && (
              <div className="eventCardSection">
                <VendorsTable vendors={vendorList} />
              </div>
            )}
          </div>
        </div>
      </div>
      {modal && (
        <VendorModal
          setModal={setModal}
          org={org}
          setFetchData={setFetchData}
        />
      )}
    </div>
  );
};

export default Vendors;

const VendorModal = ({ setModal, org, setFetchData }) => {
  const category = [
    "Florist / Flower Decoration",
    "Stage & Mandap Decor",
    "Sweet & Dessert Vendor",
  ];
  const [vendorData, setVendorData] = useState({
    orgId: org.orgId,
    vendorName: "",
    vendorPhone: "",
    vendorAlternative: "",
    vendorEmail: "",
    vendorCategory: "",
  });
  const handleChange = (e) => {
    setVendorData({
      ...vendorData,
      [e.target.name]: e.target.value,
    });
  };
  const handleVendorRegister = async () => {
    await vendorRegister(vendorData);
    setModal(false);
    setFetchData(true);
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
          <p>Add Vendor</p>
        </div>
        <div className="modalUnit">
          <FloatingLabelInput
            label="Vendor Name"
            name="vendorName"
            value={vendorData.vendorName}
            onChange={handleChange}
          />
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Phone"
              name="vendorPhone"
              value={vendorData.vendorPhone}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Alternative Number"
              name="vendorAlternative"
              value={vendorData.vendorAlternative}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="modalUnit">
          <div className="modalUnitHalf">
            <FloatingLabelInput
              label="Email"
              name="vendorEmail"
              value={vendorData.vendorEmail}
              onChange={handleChange}
            />
          </div>
          <div className="modalUnitHalf">
            <FloatingSelectInput
              label="Vendor Category"
              name="vendorCategory"
              value={vendorData.vendorCategory}
              onChange={handleChange}
              options={category}
            />
          </div>
        </div>
        <div className="modalButtonSection">
          <button>Cancel</button>
          <button onClick={handleVendorRegister}>Create</button>
        </div>
      </div>
    </div>
  );
};
