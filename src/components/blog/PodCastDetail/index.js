import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import axios from "axios";
import { throttle } from "lodash";
import Header from "../Home/header";
import "./podCastDetails.scss";
import PodCastHeader from "./PodCastHeader";
import { PodCardDetailShimmer } from "../Shimmers";
import Footer from "../Home/footer";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import MobileHeader from "../Home/mobileHeader";
import CustomDialog from "./customDialog";

const getPodsURL = "https://api-v1.ainurcast.com/pdblg/blog/";
const getPodsURLById = "https://api-v1.ainurcast.com/pdblg/blog/de/";

const PostCastDetail = (props) => {
  const [podCastDetails, setPodCastDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [prevNextOptions, setPrevNextOptions] = useState([]);
  const [podItemIndex, setPodItemIndex] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    scrollToTop();
    setLoading(true);
    axios.get(getPodsURL).then((res) => {
      prevNextImagesDetails(res.data.blog_info);
      setLoading(false);
    });
  }, [props]);

  const prevNextImagesDetails = (posts) => {
    const podId = window.location.pathname.split("/").pop();
    const podDetailIndex = posts.findIndex((post) => +post.blog_id === +podId);
    setPodItemIndex(podDetailIndex);
    var prevItemIndex =
      podDetailIndex - 1 < 0 ? posts.length - 1 : podDetailIndex - 1;

    var nextItemIndex = (podDetailIndex + 1) % posts.length;
    if (prevItemIndex === nextItemIndex) {
      //No prev and next i.e only one element in the array
      if (posts.length === 0 && posts.length === 1) {
        setPrevNextOptions([]);
      } else if (posts.length === 2) {
        // only one option
        const option = [];
        option.push(posts[prevItemIndex]);
        setPrevNextOptions(option);
      }
    } else {
      const previousOption = posts[prevItemIndex];
      const nextOption = posts[nextItemIndex];
      let options = [];
      options.push(previousOption, nextOption);
      setPrevNextOptions(options);
    }
  };

  useEffect(() => {
    setLoading(true);
    const podId = window.location.pathname.split("/").pop();
    window.addEventListener("scroll", throttle(handleScroll, 200));
    axios.get(`${getPodsURLById}`,{ params: { blog_id: podId } }).then((res) => {
      setPodCastDetails(res.data.blog_info[0]);
      setLoading(false);
    });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [props]);

  const handleScroll = () => {
    const header = document.querySelector(".sticky-header");
    const podCast = document.querySelector(".pod-cast-content");
    const toTop = document.querySelector(".to-top");
    const podMedia = document.querySelector(".pod-media");
    const podMediaDimensions = podMedia && podMedia.getBoundingClientRect();
    //Here 21 is margin bottom
    const podMediaPos =
      podMediaDimensions &&
      podMediaDimensions.height +
        podMediaDimensions.top +
        21 -
        window.innerHeight;
    if (podMedia && !podMedia.style.top) {
      if (podMediaPos >= 0) {
        //Height of pod media is greater than viewport height
        podMedia.style.top = `${podMediaDimensions.top - podMediaPos}px`;
      } else {
        //Height of pod media is less than viewport height
        podMedia.style.top = `${podMediaDimensions.top - 21}px`;
      }
    }
    if (toTop) {
      if (window.pageYOffset > 100) {
        toTop.classList.add("active");
      } else {
        toTop.classList.remove("active");
      }
    }
    if (podCast && header) {
      if (podCast.getBoundingClientRect().top <= -75) {
        if (isMobile) {
        }
        header.classList.add("active-sticky-header");
      } else {
        header.classList.remove("active-sticky-header");
      }
    }
    const titles = document.getElementsByClassName("options-title");

    if (window.matchMedia("(max-width: 767px)").matches && titles[0]) {
      titles[0].style.color = "#707070";
    }
  };

  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const handleHorizontalScroll = () => {
    const prevNextPos = document.getElementsByClassName("prev-next-options")[0]
      .scrollLeft;
    const titles = document.getElementsByClassName("options-title");
    const optionCard = document.getElementsByClassName("option-card");
    if (prevNextPos > 120) {
      if (titles[0 && titles[1]]) {
        titles[0].style.color = "#212121";
        optionCard[0].style.pointerEvents = "none";
        optionCard[1].style.pointerEvents = "auto";
        titles[1].style.color = "#707070";
      }
    } else {
      if (titles[0 && titles[1]]) {
        titles[0].style.color = "#707070";
        titles[1].style.color = "#212121";
        optionCard[0].style.pointerEvents = "auto";
        optionCard[1].style.pointerEvents = "none";
      }
    }
  };

  return (
    <div className="pod-cast-container">
      <Header showSearch={false} />
      <MobileHeader showSearch={false} />
      <div className="sticky-header" style={{ padding: isMobile && "0 30px" }}>
        <PodCastHeader sticky title={podCastDetails && podCastDetails.title} />
      </div>
      <div className="pod-cast-content">
        {loading ? (
          <PodCardDetailShimmer />
        ) : (
          <>
            <PodCastHeader title={podCastDetails && podCastDetails.title} />
            <div className="pod-cast-details">
              <div className="pod-media">
                <img
                  src={podCastDetails.artwork}
                  alt="pod-cast"
                  className="pod-image"
                />
                <div className="author-details">
                  <div className="author-info">
                    <span className="author-name">
                      Author : <b>{podCastDetails.author}</b>
                    </span>
                    <span
                      className="about-author"
                      onClick={() => setOpen(true)}
                    >
                      About Author
                    </span>
                  </div>
                  <span className="publish-date">
                    Wrote on : <b>{moment(podCastDetails.created_on).format('MMMM Do YYYY')}</b>
                  </span>
                </div>
              </div>
              <div className="pod-cast-description">
                <div className="description">
                  <ReactMarkdown
                    source={podCastDetails && podCastDetails.article}
                  />
                </div>
              </div>
            </div>
            {
              <div
                className="prev-next-options active-title"
                onScroll={throttle(handleHorizontalScroll, 200)}
                style={{
                  justifyContent:
                    prevNextOptions.length === 1 && podItemIndex === 0
                      ? "flex-end"
                      : "space-between",
                }}
              >
                {prevNextOptions.length > 0 &&
                  prevNextOptions.map((option, index) => (
                    <div
                      key={index}
                      className="options"
                      onClick={() => {
                        props.history.push(`/podcast/${option.blog_id}`);
                      }}
                    >
                      <div
                        className="options-title"
                        style={{
                          textAlign: isMobile
                            ? "left"
                            : index === 0
                            ? "left"
                            : "right",
                        }}
                      >
                        {prevNextOptions.length === 1
                          ? podItemIndex === 0
                            ? "Next"
                            : "Previous"
                          : index === 0
                          ? "Previous"
                          : "Next"}
                      </div>
                      {/* <div>{podItemIndex === 0 ? "Previous" : "Next"}</div> */}
                      <div className="option-card">
                        <div className="card-media">
                          <img
                            src={option && option.artwork}
                            alt="card-media"
                            className="card-image"
                          />
                        </div>
                        <div className="card-details">
                          <div className="card-title">
                            {option && option.title}
                          </div>
                          <div className="card-description">
                            {option &&
                              option.summary.substring(0, 155) + "..."}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            }
          </>
        )}
      </div>
      <Footer />
      <div onClick={scrollToTop} className="to-top">
        <img className="next-icon" src="/assets/blog/top-icon.svg" alt="to-top" />
      </div>
      <CustomDialog
        title="About Author"
        open={open}
        onClose={() => setOpen(false)}
        actions={[
          <div
            className="action-1"
            key={1}
            onClick={() => window.open("https://sanshal.blogspot.com")}
          >
            <span className="author-story">You can read her stories here</span>
          </div>,
          <div className="action-2" key={2} onClick={() => setOpen(false)}>
            <div className="got-it">
              <img
                src="/assets/blog/done-icon.svg"
                alt="got-it"
                className="got-it-icon"
              />
              <span className="got-it-span">
                <b>Got It</b>
              </span>
            </div>
          </div>,
        ]}
      >
        <div className="author-description">
          {podCastDetails.about_author}
        </div>
        <div className="author-actions"></div>
      </CustomDialog>
    </div>
  );
};

export default PostCastDetail;
