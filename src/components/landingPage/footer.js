import React from "react";
import commonData from "../../utils/common";
import history from "../../utils/history";

const { isMobPhone, isIpad } = commonData;

const Footer = () => {
    const socialIcons = () => {
        return (
            <div className="social-links">
                <div className="social-header">
                    <span className="follow-us"> Follow us on</span>
                </div>
                <div className="social-app-icons">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.facebook.com/ainurcast/?modal=admin_todo_tour"
                    >
                        <img
                            onMouseOver={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/Facebook_Onhover.svg";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src = "/assets/facebook.svg";
                                }
                            }}
                            src="/assets/facebook.svg"
                            alt="facebook"
                        />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.instagram.com/ainurcast/?hl=en"
                    >
                        <img
                            onMouseOver={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/Instagram_Onhover.svg";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/instagram-sketched.svg";
                                }
                            }}
                            src="/assets/instagram-sketched.svg"
                            alt="instagram"
                        />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.linkedin.com/company/66309223/admin/"
                    >
                        <img
                            onMouseOver={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/Linkedin_Onhover.svg";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src = "/assets/linkedin.svg";
                                }
                            }}
                            src="/assets/linkedin.svg"
                            alt="linkedin"
                        />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://twitter.com/ainurcast"
                    >
                        <img
                            onMouseOver={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/Twitter_Onhover.svg";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src = "/assets/twitter.svg";
                                }
                            }}
                            src="/assets/twitter.svg"
                            alt="twitter"
                        />
                    </a>
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.pinterest.com/Ainurcast"
                    >
                        <img
                            src="/assets/pinterest.svg"
                            alt="pinterest"
                            onMouseOver={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src =
                                        "/assets/Pintrest_Onhover.svg";
                                }
                            }}
                            onMouseOut={(e) => {
                                if (
                                    !window.matchMedia("(max-width: 1023px)")
                                        .matches
                                ) {
                                    e.target.src = "/assets/pinterest.svg";
                                }
                            }}
                        />
                    </a>
                    <img src="/assets/whatsapp.svg" alt="whatsapp" />
                </div>
                {(isMobPhone || !isIpad) && (
                    <div className="copy-right">
                        <span className="copy-symbol">&#xa9;</span>Copyright
                        Designduo Private Limited, 2021
                    </div>
                )}
            </div>
        );
    };

    const ainurcastLogo = () => {
        return (
            <div>
                <img
                    className="footer-app-logo"
                    src="/assets/LightComposition.svg"
                    alt="logo"
                />
            </div>
        );
    };

    return (
        <div className="footer-container">
            <div className="footer">
                {(!isMobPhone || isIpad) && ainurcastLogo()}
                {!isMobPhone || isIpad ? (
                    <>
                        <ul>
                            <li onClick={() => history.push("/home")}>Home</li>
                            <li>Studio</li>
                            <li
                                onClick={() =>
                                    window.open("/blog")
                                }
                            >
                                Blog
                            </li>
                            <li>About us</li>
                        </ul>
                        <ul>
                            <li onClick={() => history.push("/privacy-policy")}>
                                Privacy Policy
                            </li>
                            <li
                                onClick={() =>
                                    history.push("/terms-and-conditions")
                                }
                            >
                                Terms of Use
                            </li>
                            <li onClick={() => history.push("/cookies-policy")}>
                            Cookie Policy
                            </li>
                            {/* <li onClick={() => history.push("/home")}>Home</li> */}
                        </ul>
                    </>
                ) : (
                    <>
                        <div
                            className="nav-item"
                            onClick={() => history.push("/home")}
                        >
                            Home
                        </div>
                        <div className="nav-item">Studio</div>
                        <div
                            className="nav-item"
                            onClick={() =>
                                window.open("/blog")
                            }
                        >
                            Blog
                        </div>
                        <div className="nav-item">About us</div>
                        <div
                            className="nav-item"
                            onClick={() => history.push("/privacy-policy")}
                        >
                            Privacy Podivcy
                        </div>
                        <div
                            className="nav-item"
                            onClick={() =>
                                history.push("/terms-and-conditions")
                            }
                        >
                            Terms of Use
                        </div>
                        <div
                            className="nav-item"
                            onClick={() => history.push("/cookies-policy")}
                        >
                            Cookie Policy
                        </div>
                        <div
                            className="nav-item"
                            onClick={() => history.push("/home")}
                        >
                            Home
                        </div>
                        <div className="nav-item">
                            For queries write to us on
                            <br />
                            <span className="support-email">
                                support@ainurcast.com
                            </span>
                        </div>
                    </>
                )}
                {socialIcons()}
            </div>
        </div>
    );
};
export default Footer;

// https://twitter.com/ainurcast
// https://www.facebook.com/ainurcast/?modal=admin_todo_tour
// https://www.instagram.com/ainurcast/?hl=en
// https://www.linkedin.com/company/66309223/admin/
