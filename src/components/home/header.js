import React, { Component } from "react";
import { throttle } from "lodash";
import history from "../../utils/history";

export default class Header extends Component {
  componentDidMount() {
    window.addEventListener("scroll", throttle(this.handleScroll, 200));
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const header = document.querySelector(".header-container");
    if (header) {
      if (window.pageYOffset > 20) {
        header.classList.add("active-header");
      } else {
        header.classList.remove("active-header");
      }
    }
  };

  render() {
    const { userDetails : { profile_img } = {}, hideLogo } = this.props;
    return (
      <div className="header-container">
        <div className="header">
          <img
            src="/assets/studio-logo.svg"
            alt="studioLogo"
            onClick={() => history.push("/home")}
            style={{ cursor: "pointer" }}
          />
          <div className="header-right-part">
            <div
              className="blog-name"
              onClick={() => window.open("/blog")}
            >
              blog
            </div>
            {!hideLogo &&
              <div
                className="profile-pic"
                onClick={() => history.push("/profile")}
              >
                <img src={profile_img || "/assets/default-profile.svg"} alt="profile"></img>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
