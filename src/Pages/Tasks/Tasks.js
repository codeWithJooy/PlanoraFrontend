import React from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const Tasks = () => {
  return (
    <div className="main">
      <div className="mainContainer">
        <Sidebar page="Tasks"/>
        <div className="mainPage">
            <Header heading="Tasks" />
        </div>
      </div>
    </div>
  );
};

export default Tasks;
