import React,{useState} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const Teams=()=>{
    return(
        <div className="main">
            <div className="mainContainer">
                <Sidebar page="Teams" />
                <div className="mainPage">
                    <Header heading="Teams" />
                </div>
            </div>
        </div>
    )
}

export default Teams;