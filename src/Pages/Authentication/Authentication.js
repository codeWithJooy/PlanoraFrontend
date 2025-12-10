import React, { useState, useEffect } from "react";
import "./Authentication.css";
import { useHistory } from "react-router-dom";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import { orgLogin, orgSignup } from "../../redux/actions/authAction";

const Authentication = () => {
  const [toggle, setToggle] = useState("signup");
  const history = useHistory();
  return (
    <div className="authMain">
      <div className="authContainer">
        <div className="authImage">
          {toggle === 'signup' && <img src="assets/authentication/wedding.webp" />}
          {toggle === 'login' && <img src="assets/authentication/events.jpg" />}
        </div>
        <div className="authSection">
          {toggle === "signup" && (
            <Signup setToggle={setToggle} history={history} />
          )}
          {toggle === "login" && <Login setToggle={setToggle} history={history}/>}
        </div>
      </div>
    </div>
  );
};

export default Authentication;

const Signup = ({ setToggle, history }) => {
  const [orgDetails, setOrgDetails] = useState({
    orgName: "",
    orgPhone: "",
    orgPassword: "",
    orgEmail: "",
    type: "startup",
  });
  const handleOnChange = (e) => {
    setOrgDetails({
      ...orgDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    let data = await orgSignup(orgDetails);
    if (data) {
      history.push("/onboard");
    }
  };
  return (
    <div className="authCard">
      <div className="authHeader">
        <p>Welcome To Planora </p>
      </div>
      <div className="authInput">
        <FloatingLabelInput
          label="Organisations Name"
          name="orgName"
          value={orgDetails.orgName}
          onChange={handleOnChange}
        />
      </div>
      <div className="authInput">
        <div className="authMultiInput">
          <FloatingLabelInput
            label="Organisations Phone"
            name="orgPhone"
            value={orgDetails.orgPhone}
            onChange={handleOnChange}
          />
        </div>
        <div className="authMultiInput">
          <FloatingLabelInput
            label="Organisations Email"
            name="orgEmail"
            value={orgDetails.orgEmail}
            onChange={handleOnChange}
          />
        </div>
      </div>
      <div className="authInput">
        <FloatingLabelInput
          label="Enter Password"
          type="password"
          name="orgPassword"
          value={orgDetails.orgPassword}
          onChange={handleOnChange}
        />
      </div>
      <div className="authInput">
        <FloatingLabelInput label="Confirm Password" type="password" />
      </div>
      <div className="authInput">
        <button onClick={handleSignup}>Sign Up</button>
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

const Login = ({ setToggle, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async () => {
    let data = await orgLogin({ email, password });
    if (data === "new") {
      history.push("/onboard");
    } else if (data === "onboarded") {
      history.push("/dashboard");
    } else {
      setToggle("signup");
    }
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
