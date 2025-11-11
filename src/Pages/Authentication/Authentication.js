import React, { useState, useEffect } from "react";
import "./Authentication.css";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";

const Authentication = () => {
  const [toggle,setToggle]=useState('signup')
  return (
    <div className="authMain">
      <div className="authContainer">
        <div className="authImage">
          <img src="assets/authentication/authentication.jpg" />
        </div>
        <div className="authSection">
        {
          toggle==='signup' &&
          <Signup setToggle={setToggle}/>
        }
        {
          toggle==='login' &&
          <Login setToggle={setToggle}/>
        }
        </div>
      </div>
    </div>
  );
};

export default Authentication;

const Signup=({setToggle})=>{
  return(
    <div className="authCard">
    <div className="authHeader">
      <p>Welcome To Planora </p>
    </div>
    <div className="authInput">
      <FloatingLabelInput label="Organisations Name" />
    </div>
    <div className="authInput">
      <div className="authMultiInput">
        <FloatingLabelInput label="Organisations Phone" />
      </div>
      <div className="authMultiInput">
        <FloatingLabelInput label="Organisations Email" />
      </div>
    </div>
    <div className="authInput">
      <FloatingLabelInput label="Enter Password" />
    </div>
    <div className="authInput">
      <FloatingLabelInput label="Confirm Password" />
    </div>
    <div className="authInput">
      <button>Sign Up</button>
    </div>
    <div className="already">
      <p>Already have an account ? <span className="link" onClick={()=>setToggle('login')}>Log In</span></p>
    </div>
  </div>
  )
}

const Login=({setToggle})=>{
  return(
    <div className="authCard">
    <div className="authHeader">
      <p>Welcome Back To Planora </p>
    </div>
    <div className="authInput">
      <FloatingLabelInput label="Organisations Email" />
    </div>
    <div className="authInput">
      <FloatingLabelInput label="Enter Password" />
    </div>

    <div className="authInput">
      <button>Log In</button>
    </div>
    <div className="already">
      <p>New To Planora ? <span className="link" onClick={()=>setToggle('signup')}>Sign Up</span></p>
    </div>
  </div>
  )
}
