import React,{useState,useEffect} from "react";
import "./Dashboard.css"
import "../../global.css"
import Sidebar from "../../Components/Sidebar/Sidebar";

const Dashboard=()=>{
    return(
      <div className="main">
        <div className="mainContainer">
         <Sidebar page="Dashboard"/>
        </div>
      </div>
    )
}

export default Dashboard;