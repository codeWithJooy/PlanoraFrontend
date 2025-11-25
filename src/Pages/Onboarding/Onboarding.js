import React, { useState, useEffect } from "react";
import {useHistory} from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import "./Onboarding.css";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingLabelTextarea from "../../Components/FloatingInput/FLoatingLabelTextArea";
import { orgDetails } from "../../redux/actions/authAction";

const Onboarding = () => {
  const { org } = useSelector((state) => state.org);
  const [step, setStep] = useState(0);
  const history=useHistory();
  const [onboard,setOnboard]=useState({
    orgId:org.orgId,
    officialAddress:"",
    description:"",
    insta:"",
    website:"",
    teamStrength:"",
    externalVendor:""
  })
  const handleChange=(e)=>{
     setOnboard({
      ...onboard,
      [e.target.name]:e.target.value
     })
  }

  const totalSteps = 3;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const progressPercentage = (step / totalSteps) * 100;

  const cardContents = [
    {
      title: "Step 1",
      description: "This is the first card. Click to go to Step 2.",
    },
    {
      title: "Step 2",
      description: "You’re on the second step. Click to go to Step 3.",
    },
    {
      title: "Step 3",
      description: "Final step! You’ve completed all steps.",
    },
  ];

  const handleNextCard = () => {
    setStep(step + 1);
    console.log(onboard)
  };
  const handleBackCard = () => {
    setStep(step - 1);
  };
  const handleCancel=()=>{
     history.push("/")
  }
  const handleOnboard=async()=>{
    console.log(onboard)
    const data=await orgDetails(onboard)
    if(data){
      history.push("/dashboard")
    }
 }

  return (
    <div className="onboardMain">
      <div className="progress-page">
        {/* Steps with line and circles */}
        <div className="progress-container">
          <div
            className="progress-line"
            style={{ width: `${progressPercentage}%` }}
          ></div>

          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`progress-step ${n <= step ? "active" : ""}`}
            >
              {n}
            </div>
          ))}
        </div>
      </div>
      {step === 0 && (
        <div className="onboardMainSection">
          <div className="onboardCard">
            <div className="onboardLeft">
              <img src="assets/authentication/authentication.jpg" />
            </div>
            <div className="onboardRight">
              <div className="onBoardTitle">
                <p>Organisation Details</p> 
              </div>
              <div className="authInput">
                <FloatingLabelTextarea label="Official Address" name="officialAddress" onChange={handleChange}/>
              </div>
              <div className="authInput">
                <FloatingLabelTextarea label="Description" name="description" onChange={handleChange}/>
              </div>
              <div className="onboardingButtonSection">
                <button className="onboardLeftButton" onClick={handleCancel}>Cancel</button>
                <button className="onboardRightButton" onClick={handleNextCard}>
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="onboardMainSection">
          <div className="onboardCard">
            <div className="onboardLeft">
              <img src="assets/authentication/authentication.jpg" />
            </div>
            <div className="onboardRight">
              <div className="onBoardTitle">
                <p>Organisation Details</p>
              </div>
              <div className="authInput">
                <FloatingLabelInput label="Instagram Handle" name="insta" onChange={handleChange}/>
              </div>
              <div className="authInput">
                <FloatingLabelInput label="Website" name="website" onChange={handleChange}/>
              </div>
              <div className="onboardingButtonSection">
                <button className="onboardLeftButton" onClick={handleBackCard}>Back</button>
                <button className="onboardRightButton" onClick={handleNextCard}>Next</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="onboardMainSection">
          <div className="onboardCard">
            <div className="onboardLeft">
              <img src="assets/authentication/authentication.jpg" />
            </div>
            <div className="onboardRight">
              <div className="onBoardTitle">
                <p>Organisation Details</p>
              </div>
              <div className="authInput">
                <FloatingLabelInput label="How Many team members you work with ?" name="teamStrength" onChange={handleChange}/>
              </div>
              <div className="authInput">
                <FloatingLabelInput label="Do You manage External Vendors ?" name="externalVendor" onChange={handleChange}/>
              </div>
              <div className="onboardingButtonSection">
                <button className="onboardLeftButton" onClick={handleBackCard}>Back</button>
                <button className="onboardRightButton" onClick={handleOnboard}>Onboard</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Onboarding;
