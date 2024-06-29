import React, { PureComponent } from "react";
import PublishPodcast from "./publishPodcast";
import EditIcon from "@material-ui/icons/Edit";
import GenericStepDetailsShimmer from "../shimmers/GenericStepDetailsShimmer";

const stepHeading = {
    2: {
        hd: "Awesome!",
        hdDesc: "You have created your podcast. Last step to publish.",
    },
    3: {
        hd: "Well Done !",
        hdDesc: " Go on and click below to publish your podcast.",
    },
    4: {
        hd: "Published !",
        hdDesc: "Now distributing podcast to below OTT platforms.",
    },
};

export default class GenericStepDetails extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            readMore: false,
        };
    }

    handleReadMoreLess = () => {
        const { readMore } = this.state;
        this.setState({
            readMore: !readMore,
        });
    };

    showAverageList = () => {
        const {
            podcastData: { otts_info = [] },
        } = this.props;
        for (let i in otts_info) {
            if (otts_info?.[i]?.status === "DISTRIBUTED") {
                return true;
            }
        }
        return false;
    };
    render() {
        const {
            podcastData,
            podcastData: {
                categories = [],
                language = [],
                is_published = false,
            },
            stepNumber,
            onEditPodcastClick = () => {},
            showLoader,
        } = this.props;
        const { readMore } = this.state;
        const podcasterName = podcastData?.name;
        const podcastDescription = podcastData?.description;
        const coverartImage = podcastData?.cover_art;
        const uniqueListeners = podcastData?.unique_listeners;
        return (
            <>
                {showLoader ? (
                    <GenericStepDetailsShimmer />
                ) : (
                    <div className="step-details">
                        <div className="user-name-speaks">
                            <div className="podcast-name">{podcasterName}</div>
                            <div className="edit-icon">
                                <EditIcon
                                    onClick={() => onEditPodcastClick()}
                                />
                            </div>
                        </div>
                        <div className="step-wise-details">
                        <div style={{width: '190px'}}>
                            <img
                                src={
                                    coverartImage
                                        ? coverartImage
                                        : "/assets/mypodcastcoverart.png"
                                }
                                alt="mypodcastcoverart"
                                className="podcast-coverart-img"
                            />
                        </div>
                            {this.showAverageList() &&
                            stepNumber === 3 &&
                            is_published ? (
                                <div className="average-no-of-listeners">
                                    <div className="avg-lstnr-count">{uniqueListeners}</div>
                                    <div className="avg-list-per-episode">
                                        Average number of LISTENERS per episode
                                    </div>
                                    <div className="listener-equation">
                                        * 1 LISTENER = 1 unique person listening
                                        more than 50% of episode.
                                    </div>
                                </div>
                            ) : (
                                <div className="step-progress-details">
                                    <div className="steps-progress">
                                        {[1, 2, 3].map((step) => {
                                            return (
                                                <>
                                                    <div
                                                        className={
                                                            step < stepNumber
                                                                ? `stepper completed-step`
                                                                : stepNumber ===
                                                                  step
                                                                ? is_published &&
                                                                  stepNumber ===
                                                                      3
                                                                    ? "stepper completed-step"
                                                                    : `stepper step-in-progress`
                                                                : `stepper`
                                                        }
                                                    >
                                                        {step === 3 ? (
                                                            <img
                                                                src={
                                                                    stepNumber ===
                                                                    2
                                                                        ? "/assets/rss.svg"
                                                                        : "/assets/wifi.svg"
                                                                }
                                                                alt="rss"
                                                                width="42"
                                                            />
                                                        ) : (
                                                            step
                                                        )}
                                                    </div>
                                                </>
                                            );
                                        })}
                                    </div>
                                    <div className="prev-step-acmpshmts">
                                        <span className="awesome-text">
                                            {is_published && stepNumber === 3
                                                ? stepHeading["4"].hd
                                                : stepHeading[stepNumber].hd}
                                        </span>
                                        <br />
                                        {is_published && stepNumber === 3
                                            ? stepHeading["4"].hdDesc
                                            : stepHeading[stepNumber].hdDesc}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div
                            className={
                                readMore
                                    ? "step-2-description expanded-step-2-description"
                                    : "step-2-description"
                            }
                        >
                            {podcastDescription}
                        </div>
                        <div className="categories-languages">
                            <div className="categories">
                                <div className="pd-cat-hd">
                                    Podcast Categories
                                </div>
                                {categories?.map((cat, i) => {
                                    return (
                                        <div
                                            key={`category-${i}`}
                                            className="category-wrapper"
                                        >
                                            <div className="category">
                                                {cat?.category || ""}
                                            </div>
                                            <div>&nbsp;::&nbsp;</div>
                                            <div className="sub-category">
                                                {cat?.sub_category || ""}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="languages">
                                <div className="pd-lan-hd">
                                    Podcast Languages
                                </div>
                                {language?.map((lan, i) => {
                                    return (
                                        <div
                                            key={`language-${i}`}
                                            className="pd-language"
                                        >
                                            {lan?.name || ""}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {stepNumber === 3 && <PublishPodcast {...this.props} />}
                    </div>
                )}
            </>
        );
    }
}
