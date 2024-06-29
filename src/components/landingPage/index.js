import React, { useState } from "react";
import { CustomButton } from "../customComponents";
import history from "../../utils/history";
import commonData from "../../utils/common";
import Footer from "./footer";



const { isMobPhone, isIpad } = commonData;

export default function LandingPage() {
    const [toggleAbout, settoggleAbout] = useState(false);

    const showAbout = () => {
        settoggleAbout(true);
    };

    const hideAbout = () => {
        settoggleAbout(false);
    };

    const homeRedirection = () => {
        history.push("/home");
    };

    const getNavigation = () => {
        return (
            <div className="navigation">
                <img
                    src="/assets/Logo.svg"
                    alt="ainurcast-logo"
                    className="ainurcast-logo"
                />
                <ul>
                    <li onClick={()=>{
                            settoggleAbout(false);
                            history.push("/")}}>
                            Home</li>
                    <li onClick={showAbout}>About Us</li>
                    <li onClick={() => window.open("/blog")}>Blog</li>
                </ul>
            </div>
        );
    };

    const langPageMoto = () => {
        return (
            <div className="lan-page-moto">
                WANNA VOICE YOUR MIND <br /> LEAVING BARRIERS BEHIND
                <p>
                    We are here to take care of your podcast creation and
                    distribution to OTT players like Spotify, Gaana, Saavn …
                </p>
                <CustomButton
                    primary
                    label={
                        isMobPhone || isIpad
                            ? "Try Ainurcast"
                            : "Join Ainurcast"
                    }
                    className="btn"
                    onClick={homeRedirection}
                />
                {getNavigation()}
            </div>
        );
    };

    const getLanPageMotto = () => {
        if ((isMobPhone || isIpad) && !toggleAbout) {
            return langPageMoto();
        } else if (!isMobPhone && !isIpad) {
            return langPageMoto();
        }
    };

    return (
        <>
            <div className="landing-page-container">
                <div className="landing-overlay"></div>
                <div className="lan-page-content">
                    {getLanPageMotto()}
                    {!toggleAbout && isMobPhone && (
                        <div className="mob-boy">
                            <img
                                src="/assets/landing-boy.png"
                                alt="landing-boy-src"
                            />
                        </div>
                    )}
                    {toggleAbout && (
                        <div className="lan-page-about">
                            <div className="flex-between">
                                <div className="about-hd">About Us</div>
                                <div
                                    className="cross-icon-wrapper"
                                    onClick={hideAbout}
                                >
                                    <div className="cross-icon">+</div>
                                </div>
                            </div>
                            <div className="about-content">
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry. Lorem Ipsum has been
                                the industry’s standard dummy text ever since
                                the 1500s, when an unknown printer took a galley
                                of type and scrambled it to make a type specimen
                                book. It has survived not only five centuries,
                                but also the leap into electronic typesetting,
                                remaining essentially unchanged. It was
                                popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing
                                software like Aldus PageMaker including versions
                                of Lorem Ipsum.
                            </div>

                            {(isMobPhone || isIpad) && (
                                <>
                                    <div className="nav-item">
                                        For queries write to us on
                                        <br />
                                        <span className="support-email">
                                            support@ainurcast.com
                                        </span>
                                    </div>
                                    {getNavigation()}
                                </>
                            )}
                        </div>
                    )}
                </div>
                {!toggleAbout && (
                    <div className="landing-boy">
                        <img
                            src="/assets/landing-boy.png"
                            alt="landing-boy-src"
                        />
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
