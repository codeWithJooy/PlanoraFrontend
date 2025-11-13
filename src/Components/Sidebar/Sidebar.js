import React from "react";
import { useHistory } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ page = "Dashboard" }) => {
  const history = useHistory();
  const handleRedirect=(pagelink)=>{
     history.push(`/${pagelink}`)
  }
  const menuItems = [
    { name: "Dashboard", icon: "dashboard.png" ,pagelink:"dashboard"},
    { name: "Events", icon: "dashboard.png" ,pagelink:"events"},
    { name: "Tasks", icon: "dashboard.png" , pagelink:"tasks"},
    { name: "Vendors", icon: "dashboard.png" , pagelink:"dashboard"},
    { name: "Team", icon: "dashboard.png" , pagelink:"dashboard"},
    { name: "Settings", icon: "dashboard.png" , pagelink:"dashboard"},
  ];

  return (
    <div className="sidebarSection">
      <div className="orgLogoName">
        <img src="assets/common/planoraLogo.png" alt="Planora Logo" />
      </div>
      <div className="sidebar">
        {menuItems.map((item) => (
          <div
            key={item.name}
            onClick={()=>handleRedirect(item.pagelink)}
            className={`sidebarUnit ${
              page === item.name ? "sideunitActive" : ""
            }`}
          >
            <img src={`assets/common/${item.icon}`} alt={`${item.name} icon`} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
