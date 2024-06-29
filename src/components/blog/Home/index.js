import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import "./home.scss";
import Footer from "./footer";
import { PodCardShimmer } from "../Shimmers";
import MobileHeader from "./mobileHeader";
import mobileLottieLogo from "./mobile_logo_lottie.json";
import lottieLogo from "./logo_lottie.json";
import Lottie from "lottie-react";

const getPodsURL = "https://api-v1.ainurcast.com/pdblg/blog/";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appLogoDimensions, setAppLogoDimensions] = useState(0);
  const lottieAnimatedLogo = {
    loop: false,
    autoplay: false,
    animationData: window.matchMedia("(max-width: 720px)").matches
      ? mobileLottieLogo
      : lottieLogo,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const [timer, setTimer] = useState({
    hideCards: false,
    showHeader: false,
    hideCaption: true,
  });
  useEffect(() => {
    scrollToTop();
    setLoading(true);
    setTimeout(() => {
      const appLogoXValue = document
        .getElementsByClassName("app-logo")[0]
        .getBoundingClientRect().x;
      setAppLogoDimensions(appLogoXValue);
    }, 100);

    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
      },
    };

    axios.get(getPodsURL, options).then((res) => {
      setPosts(res.data.blog_info);
      setLoading(false);
    });
    if (JSON.parse(sessionStorage.getItem("isFirst"))) {
      setTimer((prevState) => ({
        ...prevState,
        hideCaption: true,
        hideCards: true,
        showHeader: true,
      }));
      setTimeout(() => {
        sessionStorage.setItem("isFirst", false);
        setTimer((prevState) => ({
          ...prevState,
          hideCaption: false,
        }));
        setTimeout(() => {
          setTimer((prevState) => ({
            ...prevState,
            hideCards: false,
          }));
        }, 800);
        setTimeout(() => {
          setTimer((prevState) => ({
            ...prevState,
            showHeader: false,
          }));
        }, 4000);
      }, 4000);
    }
  }, []);

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const navigateToDetails = (id) => {
    props.history.push(`/podcast/${id}`);
  };

  const assignClassName = () => {
    setTimeout(() => {
      if (document.getElementsByClassName("posts")[0]) {
        const { x } = document
          .getElementsByClassName("posts")[0]
          .getBoundingClientRect();
        if (window.matchMedia("(min-width: 1920px)").matches) {
          document.getElementsByClassName(
            "animated-app-logo"
          )[0].style.transform = `translate(${-(appLogoDimensions - x)}px,23px)
      `;
        } else {
          document.getElementsByClassName(
            "animated-app-logo"
          )[0].style.transform = `translate(${-(appLogoDimensions - x)}px, 18px)
      `;
        }
      }
    }, 100);
    return "animated-app-logo";
  };

  const getViewportPadding = () => {
    if (window.matchMedia("(min-width: 1920px)").matches) {
      return "120px";
    }
    return "100px";
  };

  return (
    <>
      <>
        {timer.showHeader && (
          <div className="landing-loader-container">
            <div className="company-details">
              <div
                className={!timer.hideCards ? assignClassName() : "app-logo"}
              >
                <Lottie
                  options={lottieAnimatedLogo}
                  isStopped={timer.hideCards}
                />
              </div>
              <span
                className={
                  !timer.hideCaption
                    ? "hide-caption company-vision"
                    : "company-vision"
                }
              >
                Empower everyone to broadcast their voice with ease and quality.
              </span>
            </div>
            <div className="push"></div>
          </div>
        )}
        <div
          className={!timer.hideCards ? "hide-loading-cards" : "loading-cards"}
        >
          <div className="loading-card loading-card1"></div>
          <div className="loading-card loading-card2"></div>
          <div className="loading-card loading-card3"></div>
          <div className="loading-card loading-card4"></div>
        </div>
      </>
      <Header showSearch={false} showHeader={timer.showHeader} />
      <MobileHeader showSearch={false} showHeader={timer.showHeader} />
      <div
        className={timer.hideCards ? "animated-home-page" : "home-page-wrapper"}
      >
        {loading ? (
          <PodCardShimmer />
        ) : (
          <div
            className="posts"
            style={{
              paddingTop: !timer.showHeader ? getViewportPadding() : "11px",
            }}
          >
            {posts &&
              posts.map((post, index) => {
                return (
                  <div
                    className="card"
                    key={post.blog_id}
                    onClick={() => navigateToDetails(post.blog_id)}
                  >
                    <div className="card-media">
                      <img
                        src={post.artwork}
                        alt="card-img"
                        className={`card-img`}
                      />
                    </div>
                    <div className="card-content">
                      <div className="card-title">{post.title}</div>
                      <div className="card-desc">
                        {post.summary.substring(0, 155) + "..."}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
