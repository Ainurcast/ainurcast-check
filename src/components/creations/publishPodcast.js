import React, { PureComponent } from "react";
import {
    CustomAudioLoader,
    CustomButton,
    CustomDialog as Dialog,
    CustomTextInput,
} from "../customComponents";
import commonData from "../../utils/common";
import PropTypes from "prop-types";

const imagePodcastMap = {
    GAANA: "/assets/podcastImages/gaana",
    JIO_SAAVN: "/assets/podcastImages/jio_saavn",
    AMAZON_MUSIC: "/assets/podcastImages/amazon",
    SPOTIFY: "/assets/podcastImages/spotify",
    APPLE_PODCASTS: "/assets/podcastImages/apple_podcast",
    GOOGLE_PODCASTS: "/assets/podcastImages/google_podcast",
};
export default class PublishPodcast extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showCopyDescription: false,
            openViolationDialog: false,
            violationMsg: "",
            selectedOttId: "",
        };
    }

    publishPodcast = () => {
        const {
            podcastData: { podcast_id = "" },
        } = this.props;

        this.props.publishPodcast({
            podcast_id: podcast_id,
            is_published: "True",
        });
    };
    returnPublishPodcast = () => {
        const { showRssProgressBar } = this.props;
        return (
            <>
                {showRssProgressBar ? (
                    <CustomAudioLoader
                        showCross={false}
                        showPublishMsg
                        customLoaderStyle={{ width: "auto" }}
                    />
                ) : (
                    <CustomButton
                        primary
                        label="Publish Podcast"
                        onClick={this.publishPodcast}
                        yellowBtn
                        style={{
                            fontSize: "24px",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                        }}
                    />
                )}

                <div className="terms-hd">
                    By clicking on Publish you will agree to the following.
                </div>
                <div className="terms-and-conditions">
                    <div className="each-term">
                        Content copyright lies with me and Ainurcast is fully
                        authorised to store and distribute as needed.
                    </div>
                    <div className="each-term">
                        I claim full responsibility for uploading infringed
                        content or not marking explicit content explicit and
                        Ainurcast is fully authorised to remove such content
                        from the distributed platforms.
                    </div>
                    <div className="each-term">
                        I have checked and understood the Terms and Conditions
                        and I agree to it.
                    </div>
                </div>
                <div className="policy-redirection">
                    <CustomButton label="Click to view Terms and Conditions Document" />
                </div>
            </>
        );
    };
    setNode = (node) => {
        this.linkRef = node;
    };
    getRssLink = (rss_feed_url) => {
        return (
            <div className="rss-link">
                <div className="rss-image">
                    <img src="/assets/rss.svg" alt="backward-button" />
                </div>
                <div ref={this.setNode} className="rss-link-name">
                    {rss_feed_url}
                </div>
                <div
                    className="copy-to-clipboard"
                    onClick={this.copyToClipboard}
                >
                    <img src="/assets/Copy.svg" alt="copy-button" />
                </div>
            </div>
        );
    };

    handleCopyDescription = () => {
        const { showCopyDescription } = this.state;
        this.setState({
            showCopyDescription: !showCopyDescription,
        });
    };

    copyToClipboard = (e) => {
        const copyToClipboardListener = (e) => {
            e.clipboardData.setData("text/plain", this.linkRef.textContent);
            e.preventDefault();
        };
        document.addEventListener("copy", copyToClipboardListener);
        document.execCommand("copy");
        this.handleCopyDescription();
        document.removeEventListener("copy", copyToClipboardListener);
    };

    returnOttStatus = (data) => {
        const { status = "" } = data;
        if (["PROCESSING", "NOT_INITIATED"].includes(status)) {
            return "Under Process…";
        } else if (status === "DISTRIBUTED") {
            return (
                <div className="live-circle">
                    <div className="live-outer-circle"></div>
                    <div className="live-inner-circle"></div>
                    <div style={{ marginLeft: "10px" }}>Live</div>
                </div>
            );
        } else if (status === "DISABLED") {
            return <div style={{ color: "#6B6B6B" }}>Disabled</div>;
        } else {
            return (
                <div
                    style={{
                        color: "#E60000",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <img
                        src="/assets/error-icon.svg"
                        alt="error-icon"
                        style={{ marginRight: "2px" }}
                    />
                    Rejected
                </div>
            );
        }
    };

    returnOttDescription = (data) => {
        const { status = "", approx_days = "", distributed_data = "" } = data;
        if (["PROCESSING", "NOT_INITIATED"].includes(status)) {
            return `Will take approx. ${approx_days} day${
                approx_days > 1 ? "s" : ""
            }`;
        } else if (status === "DISTRIBUTED") {
            return `From ${commonData.formatDate(
                distributed_data,
                "DD MMM YYYY"
            )}`;
        } else if (status === "DISABLED") {
            return "Maximum trials reached";
        } else {
            return "Retry by clicking icon above";
        }
    };

    handleOTTActions = (status, url, ottId) => {
        if (status === "DISTRIBUTED") {
            window.open(url);
        }
        if (status === "REJECTED") {
            this.setState({
                openViolationDialog: true,
                selectedOttId: ottId,
            });
        }
    };

    getOTTData = () => {
        let {
            podcastData: { otts_info = [], rss_feed_url = "" } = {},
            userDetails,
        } = this.props;
        const { showCopyDescription } = this.state;
        let ottDistributed = true;
        for (let i in otts_info) {
            if (
                otts_info?.[i]?.status === "PROCESSING" ||
                otts_info?.[i]?.status === "NOT_INITIATED" ||
                otts_info?.[i]?.status === "REJECTED"
            ) {
                ottDistributed = false;
                break;
            }
        }
          console.log("otts_info",otts_info)

        return (
            <div className="ott-data-wrapper">
                <div className="ott-data-hd">
                    {ottDistributed
                        ? "Your podcast is now available on following OTTs."
                        : "We are distributing your podcast to the following OTTs."}
                </div>
                <div className="ott-data-sub-hd">
                    {ottDistributed
                        ? "You can click on each OTT below to share your respective podcast link in social media."
                        : "It may take a while to distribute in all OTT platforms. We will notify you the progress via email."}
                </div>
                <div className="ott-list-wrapper">
                    {otts_info?.map((ottData, index) => {
                        let  {
                            ott_name = "",
                            status = "",
                            url = "",
                            ott_id = "",
                        } = ottData;
                        ott_name = ott_name === "WYNK" ? "AMAZON_MUSIC" : ott_name;
                        console.log("ott_name",ott_name)
                        const src = `${imagePodcastMap?.[ott_name]}${
                            status === "DISTRIBUTED"
                                ? "_black"
                                : status === "DISABLED"
                                ? "_disable"
                                : "_grey"
                        }.svg`;
                        const imageClassName =
                            status !== "DISTRIBUTED"
                                ? "podcast-owner-image"
                                : "";
                        const podcastAllowed = [
                            "DISTRIBUTED",
                            "DISABLED",
                            "REJECTED",
                        ].includes(status);
                        return (
                            <div className="ott-list">
                                <div
                                    className="logo-wrapper"
                                    style={{
                                        marginBottom:
                                            status === "DISTRIBUTED" && "4px",
                                    }}
                                >
                                    <div
                                        className="logo-outer"
                                        style={{
                                            background:
                                                podcastAllowed && "none",
                                            animation: podcastAllowed && "none",
                                        }}
                                    ></div>
                                    <div
                                        className="ott-logo"
                                        style={{
                                            cursor: podcastAllowed
                                                ? "pointer"
                                                : "not-allowed",
                                        }}
                                        onClick={() =>
                                            this.handleOTTActions(
                                                status,
                                                url,
                                                ott_id
                                            )
                                        }
                                    >
                                        <img
                                            className={imageClassName}
                                            src={src}
                                            alt="podcast-img"
                                        />
                                    </div>
                                </div>
                                <div className="ott-status">
                                    {this.returnOttStatus(ottData)}
                                </div>
                                <div className="ott-desc">
                                    {this.returnOttDescription(ottData)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                {ottDistributed && rss_feed_url && (
                    <div className="rss-feed-details">
                        {showCopyDescription && (
                            <div className="rss-copy-msg">
                                <div className="rss-copy-hd">
                                    RSS Successfully Copied
                                </div>
                                <div className="rss-copy-desc">
                                    Now you can share this RSS in OTT platforms
                                    other than those we have already distributed
                                    your podcast to. You may be asked to verify
                                    via your Sign up email id :&nbsp;
                                    <span className="user-name">
                                        {userDetails?.email || ""}
                                    </span>
                                </div>
                                <div className="copy-btn-wrapper">
                                    <CustomButton
                                        onClick={this.handleCopyDescription}
                                        label={
                                            <>
                                                <img
                                                    src="/assets/done-icon.svg"
                                                    alt="done-icon"
                                                    className="done-icon"
                                                />
                                                Got It
                                            </>
                                        }
                                    />
                                </div>
                            </div>
                        )}
                        <div className="copy-rss-hd">
                            Copy RSS below to distribute your podcast manually.
                        </div>
                        <div className="rss-wrapper">
                            {this.getRssLink(rss_feed_url)}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    closeViolationDialog = () => {
        this.setState({
            openViolationDialog: false,
        });
    };

    violationList = (subHeader, content) => {
        return (
            <div className="vio-sub-hd">
                {subHeader} <span className="vio-content">{content}</span>
            </div>
        );
    };

    handleViolationInputChange = (e) => {
        this.setState({
            violationMsg: e.target.value,
        });
    };

    handleRetry = () => {
        const { violationMsg, selectedOttId } = this.state;

        if (violationMsg.toLowerCase() === "no violations") {
            this.props.violationsRetry({ ott_id: selectedOttId });
        }
    };

    getProps = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            const dialogProps = {
                mobileView: true,
                fullScreen: true,
                showCrossIcon: true,
            };
            if (!this.isMobilePhone()) {
                return dialogProps;
            }
            dialogProps["actions"] = [this.getViolationForm()];
            return dialogProps;
        }
        return {
            padding: "0px 40px 0 40px",
        };
    };

    getViolationForm = () => {
        const { violationMsg } = this.state;
        return (
            <div
                className={`${
                    this.isMobilePhone ? "d-flex" : "violation-form"
                }`}
            >
                <div className={this.isMobilePhone ? "margin-right-24" : ""}>
                    <CustomTextInput
                        name="search"
                        helperText="Type in “no violations” above and click on “Retry”"
                        value={violationMsg}
                        onChange={this.handleViolationInputChange}
                        className={this.isMobilePhone ? "margin-right-24" : ""}
                    />
                </div>
                <CustomButton
                    primary
                    label="Retry"
                    disabled={violationMsg.length === 0}
                    onClick={this.handleRetry}
                />
            </div>
        );
    };

    isMobilePhone = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            return true;
        }
        return false;
    };

    render() {
        const {
            podcastData: { is_published = false },
        } = this.props;
        const { openViolationDialog } = this.state;
        return (
            <div className="publish-podcast-container">
                {is_published ? this.getOTTData() : this.returnPublishPodcast()}
                <Dialog
                    {...this.getProps()}
                    open={openViolationDialog}
                    actionStyle={this.isMobilePhone ? { height: "unset" } : {}}
                    title="Retry after Platform Rejection"
                    showCrossIcon
                    onClose={this.closeViolationDialog}
                >
                    <div className="violation-dialog-hd">
                        Before retrying please ensure that your podcast don’t
                        violate the following:
                    </div>
                    {this.violationList(
                        "Intellectual property –",
                        "refrain from using brand names like “Apple,” “Nike,” or the brand logos in your description, URL, or title."
                    )}
                    {this.violationList(
                        "Trademarks –",
                        "using brand trademarks without permission will not only get you rejected, you also risk having brand owners take legal action against you."
                    )}
                    {this.violationList(
                        "Inappropriate content –",
                        "while podcasts that tackle mature subject matters are accepted, you are not allowed to use images that depict drugs, violence, sex, etc. In addition, podcasts that advocate discrimination based on sexual orientation, gender, or race will also get the rejection."
                    )}
                    {this.violationList(
                        "Not marking explicit/mature content as explicit –",
                        "there have been instances where podcasts have been removed from the platforms because they weren’t marked accordingly. If you slip an F-bomb, however occasional, play it safe by marking the entire show as explicit."
                    )}
                    {!this.isMobilePhone() && this.getViolationForm()}
                </Dialog>
            </div>
        );
    }
}

PublishPodcast.propTypes = {
    podcastData: PropTypes.object,
    showRssProgressBar: PropTypes.bool,
};

PublishPodcast.defaultProps = {
    podcastData: {},
    showRssProgressBar: false,
};
