import React,{useState} from "react";
import "./Sidebar.css"

const Sidebar=({page="Dashboard"})=>{
    return(
        <div className="sidebarSection">
        <div className="orgLogoName">
            <img src="assets/common/planoraLogo.png" />
        </div>
        <div className="sidebar">
            <div className="sidebarUnit ">
                <img src="assets/common/dashboard.png"/>
                <p>Dashboard</p>
            </div>
            <div className="sidebarUnit sideunitActive">
                <img src="assets/common/dashboard.png"/>
                <p>Events</p>
            </div>
            <div className="sidebarUnit ">
                <img src="assets/common/dashboard.png"/>
                <p>Tasks</p>
            </div>
            <div className="sidebarUnit ">
                <img src="assets/common/dashboard.png"/>
                <p>Vendors</p>
            </div>
            <div className="sidebarUnit ">
                <img src="assets/common/dashboard.png"/>
                <p>Team</p>
            </div>
            <div className="sidebarUnit ">
                <img src="assets/common/dashboard.png"/>
                <p>Settings</p>
            </div>-
        </div>
    </div>
    )
}

export default Sidebar;