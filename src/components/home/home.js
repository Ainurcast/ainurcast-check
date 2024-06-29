import React, { Component } from "react";
import HomeContainer from "../creations";
import Header from "./header";

export default class Home extends Component {
  render() {
    const {userDetails} = this.props;
    return (
      <div className="home-container">
        <Header userDetails={userDetails} />
        <div className="podcast-container">
          <HomeContainer />
        </div>
      </div>
    );
  }
}
