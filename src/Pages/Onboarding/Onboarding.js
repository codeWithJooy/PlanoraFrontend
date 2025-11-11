import React, { useState, useEffect } from "react";
import "./Onboarding.css";
import FloatingLabelInput from "../../Components/FloatingInput/FloatingLabelInput";
import FloatingLabelTextarea from "../../Components/FloatingInput/FLoatingLabelTextArea";

const Onboarding = () => {
  const [step, setStep] = useState(1);
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
              <FloatingLabelInput label="Organisation Name" />
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
              <FloatingLabelTextarea label="Official Address" />
            </div>
            <div className="authInput">
              <FloatingLabelTextarea label="Description" />
            </div>
            <div className="onboardingButtonSection">
                <button>Cancel</button>
                <button>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
