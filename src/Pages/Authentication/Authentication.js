import React, { useState, useEffect } from "react";
import "./Authentication.css";
import { useHistory } from "react-router-dom";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import { orgLogin } from "../../redux/actions/authAction";

const Authentication = () => {
  const [toggle, setToggle] = useState("signup");
  const history = useHistory();
  return (
    <div className="authMain">
      <div className="authContainer">
        <div className="authImage">
          <img src="assets/authentication/authentication.jpg" />
        </div>
        <div className="authSection">
          {toggle === "signup" && (
            <Signup setToggle={setToggle} history={history} />
          )}
          {toggle === "login" && <Login setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
};

export default Authentication;

const Signup = ({ setToggle, history }) => {
  return (
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
        <button onClick={() => history.push("/onboard")}>Sign Up</button>
      </div>
      <div className="already">
        <p>
          Already have an account ?{" "}
          <span className="link" onClick={() => setToggle("login")}>
            Log In
          </span>
        </p>
      </div>
    </div>
  );
};

const Login = ({ setToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    console.log("Login clicked");
     await orgLogin({email,password});
     //window.location.href = "/dashboard";
  };
  return (
    <div className="authCard">
      <div className="authHeader">
        <p>Welcome Back To Planora </p>
      </div>
      <div className="authInput">
        <FloatingLabelInput
          label="Organisations Email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="authInput">
        <FloatingLabelInput
          label="Enter Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <div className="authInput">
        <button onClick={handleLogin}>Log In</button>
      </div>
      <div className="already">
        <p>
          New To Planora ?{" "}
          <span className="link" onClick={() => setToggle("signup")}>
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};
