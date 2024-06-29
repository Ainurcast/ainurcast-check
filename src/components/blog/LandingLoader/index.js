import React from "react";
import "./landingLoader.scss";

const LandingLoader = () => {
  return (
    <>
      <div className="landing-loader-container">
        <div className="company-details">
          <img src="/assets/blog/AppLogo.svg" alt="App Logo" className="app-logo" />
          <span className="company-vision">
            Empower everyone to broadcast their voice with ease and quality.
          </span>
        </div>
        <div className="push"></div>
      </div>
      <div className="loading-cards">
        <div className="loading-card loading-card1"></div>
        <div className="loading-card loading-card2"></div>
        <div className="loading-card loading-card3"></div>
        <div className="loading-card loading-card4"></div>
      </div>
    </>
  );
};

export default LandingLoader;
