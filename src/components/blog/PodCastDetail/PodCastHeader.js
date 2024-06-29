import React, { useState } from "react";
// import { isMobile } from "react-device-detect";
// import { throttle } from "lodash";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from "react-share";

import MobileDialog from "./dialog";
import { withRouter } from "react-router-dom";

const getImagesLinks = (title) => {
    return (
        <>
            <FacebookShareButton
                url={`https://www.ainurcast.com/${window.location.href
                    .split("/")
                    .splice(-2)
                    .join("/")}`}
                hashtag={"#justspeak"}
                description={"aiueo"}
                title={title}
                className="Demo__some-network__share-button"
            >
                <img
                    onMouseOver={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/Facebook_Onhover.svg";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/facebook.svg";
                        }
                    }}
                    src="/assets/blog/facebook.svg"
                    alt="facebook"
                />
            </FacebookShareButton>
            <LinkedinShareButton
                url={`https://www.ainurcast.com/${window.location.href
                    .split("/")
                    .splice(-2)
                    .join("/")}`}
                title={title}
                hashtag={"#justspeak"}
                description={"aiueo"}
                className="Demo__some-network__share-button"
            >
                <img
                    onMouseOver={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/Linkedin_Onhover.svg";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/linkedin.svg";
                        }
                    }}
                    src="/assets/blog/linkedin.svg"
                    alt="linkedin"
                />
            </LinkedinShareButton>
            <TwitterShareButton
                url={`https://www.ainurcast.com/${window.location.href
                    .split("/")
                    .splice(-2)
                    .join("/")}`}
                title={title}
                hashtags={["justspeak", "podcast"]}
            >
                <img
                    onMouseOver={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/Twitter_Onhover.svg";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/twitter.svg";
                        }
                    }}
                    src="/assets/blog/twitter.svg"
                    alt="twitter"
                />
            </TwitterShareButton>
            <WhatsappShareButton
                url={`https://www.ainurcast.com/${window.location.href
                    .split("/")
                    .splice(-2)
                    .join("/")}`}
                title={title}
                hashtag={"#justspeak"}
                description={"aiueo"}
                className="Demo__some-network__share-button"
            >
                <img
                    onMouseOver={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/Whatsapp_Onhover.svg";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (!window.matchMedia("(max-width: 1023px)").matches) {
                            e.target.src = "/assets/blog/whatsapp.svg";
                        }
                    }}
                    src="/assets/blog/whatsapp.svg"
                    alt="whatsapp"
                />
            </WhatsappShareButton>
        </>
    );
};

const PodCastHeader = ({ title, sticky, history }) => {
    const [open, setOpen] = useState(false);
    const [isMobile] = useState(false);

    return (
        <>
            <div className="header-content">
                <div className="pod-cast-header">
                    <div className="back-icon-button">
                        <img
                            className="back-arrow"
                            src="/assets/blog/back.svg"
                            alt="logo"
                            onClick={() => history.goBack()}
                        />
                    </div>
                    <div
                        className={
                            isMobile && sticky
                                ? "mobile-pod-cast-title"
                                : "pod-cast-title"
                        }
                    >
                        {title}
                    </div>
                </div>
                <img
                    src="/assets/blog/share.svg"
                    alt="Share"
                    onClick={() => setOpen(true)}
                    className="share-image"
                />
                <div className="social-links">
                    <span className="share-in">Share in</span>
                    <div className="social-app-icons">
                        {getImagesLinks(title)}
                    </div>
                </div>
            </div>
            <MobileDialog open={open} onClose={() => setOpen(false)}>
                <div className="mobile-social-links">
                    <div className="social-header">
                        <span className="share-in">Share in</span>
                    </div>
                    <div className="mobile-social-app-icons">
                        {getImagesLinks(title)}
                    </div>
                </div>
            </MobileDialog>
        </>
    );
};

export default withRouter(PodCastHeader);
