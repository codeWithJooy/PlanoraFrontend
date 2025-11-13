import React from "react";

const Header = ({ heading = "Events" }) => {
  return (
    <div className="mainHeader">
      <div className="pagePath">
        <p>{heading}</p>
      </div>
      <div className="pageUser">
        <img src="assets/Header/user.jpg" className="userIcon" />
        <p>Abhi Hazra</p>
        <img src="assets/Header/dropdown.png" className="userDropdown" />
      </div>
    </div>
  );
};

export default Header;