import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="planora-loader">
      <div className="spotlight spotlight-left"></div>
      <div className="spotlight spotlight-right"></div>
      <h1 className="planora-logo">Planora</h1>
      <p className="loader-text">Setting up your event...</p>
    </div>
  );
};

export default Loader;
