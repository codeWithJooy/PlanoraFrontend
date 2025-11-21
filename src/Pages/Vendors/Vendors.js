import React,{useState} from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Header from "../../Components/Header/Header";

const Vendors=()=>{
    return(
        <div className="main">
            <div className="mainContainer">
                <Sidebar page="Vendors" />
                <div className="mainPage">
                    <Header heading="Vendors" />
                    <div className="mainContent">
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vendors;