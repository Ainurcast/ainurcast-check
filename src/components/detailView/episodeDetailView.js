import React, { PureComponent } from "react";
import Header from "../home/header";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import history from "../../utils/history";
import {
    CustomAudioPlayer,
    CustomButton,
    CustomDialog as Dialog,
} from "../customComponents";
import CreateEpisode from "../creations/createEpisode/createEpisodeForm";
import commonData from "../../utils/common";
//materail imports
import EpisodeDetailViewShimmer from "../shimmers/episodeDetailViewShimmer";
const explicitValue = {
    Clean: "No",
    Explicit: "Yes",
};
export default class EpisodeDetailView extends PureComponent {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            episodeDetails: props.episodeDetails || {},
            openDialog: false,
        };
    }
    componentDidMount() {
        if (!localStorage.getItem("USER-CODE")) {
            history.push("/auth");
          } else {
        const { aid: episodeId = "", bid: podcastId = "" } =
            this.props?.match?.params;
        const { getEpisodeById, getUserDetails } = this.props;
        getEpisodeById({ episode_id: episodeId, podcast_id: podcastId });
        getUserDetails(true);
          }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (
            JSON.stringify(nextProps?.episodeDetails) !==
            JSON.stringify(this.props?.episodeDetails)
        ) {
            this.setState({
                episodeDetails: nextProps?.episodeDetails,
            });
        }
    }

    toggleEpisodePublish = () => {
        const { episodeDetails } = this.state;
        const reqData = {
            name: episodeDetails?.name || "",
            description: episodeDetails?.description || "",
            season_number: episodeDetails?.season_number,
            episode_number: episodeDetails?.episode_number,
            content_option: episodeDetails?.content_option,
            podcast_id: episodeDetails?.podcast_info?.podcast_id ?? "",
            episode_file: episodeDetails?.episode_file_id,
            episode_id: episodeDetails?.episode_id,
            is_published:
                episodeDetails?.is_published?.toString()?.toLowerCase() ===
                "true"
                    ? "False"
                    : "True",
        };
        if (episodeDetails?.cover_art_id) {
            reqData["cover_art"] = episodeDetails?.cover_art_id;
        }
        this.props.updateEpisode(reqData);
    };

    closeUpdateDialog = () => {
        this.setState({
            openDialog: false,
        });
    };

    saveChanges = () => {
        this.child.current.createNewEpisode();
    };

    getMobileProps = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            return {
                mobileView: true,
                fullScreen: true,
            };
        }
    };

    render() {
        const {
            episodeDetails,
            updateEpisode = () => {},
            showLoader,
            userDetails,
        } = this.props;
        const { openDialog } = this.state;
        return (
            <div>
                <Header userDetails={userDetails} />
                {showLoader ? (
                    <EpisodeDetailViewShimmer />
                ) : (
                    <div className="episode-detail-view-container">
                        <div className="episode-dtv-hd">
                            <div className="episode-name-wrapper">
                                <div className="arrow-left">
                                    <ArrowBackIcon
                                        onClick={() => history.goBack()}
                                    />
                                </div>
                                <div className="episode-name">
                                    {episodeDetails?.name || ""}
                                </div>
                            </div>
                            <div className="toggle-edit-episode">
                                {episodeDetails?.podcast_info?.is_published && (
                                    <CustomButton
                                        key={0}
                                        label={
                                            episodeDetails?.is_published
                                                ?.toString()
                                                .toLowerCase() === "true"
                                                ? "Take Down Episode"
                                                : "Make Episode Live"
                                        }
                                        onClick={this.toggleEpisodePublish}
                                    />
                                )}
                                <div className="edit-icon">
                                    <EditIcon
                                        onClick={() =>
                                            this.setState({
                                                openDialog: true,
                                            })
                                        }
                                    />
                                    <Dialog
                                        {...this.getMobileProps()}
                                        open={openDialog}
                                        title="Edit Episode"
                                        showCrossIcon
                                        onClose={this.closeUpdateDialog}
                                        actionStyle={{ display: "initial" }}
                                        actions={[
                                            <CustomButton
                                                key={0}
                                                label="Save Changes"
                                                primary
                                                onClick={this.saveChanges}
                                            />,
                                        ]}
                                    >
                                        <div className="content">
                                            <CreateEpisode
                                                ref={this.child}
                                                updateEpisode={updateEpisode}
                                                editView
                                                episodeAutoPopulateData={
                                                    episodeDetails
                                                }
                                                closeUpdateDialog={
                                                    this.closeUpdateDialog
                                                }
                                                podcastData={
                                                    episodeDetails?.podcast_info
                                                }
                                                saveEditedData={
                                                    this.saveEditedData
                                                }
                                            />
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                        <div className="episode-info">
                            <div className="episode-properties">
                                <div className="season-num">
                                    <div className="season-no-hd">Season</div>
                                    <div className="season-no">
                                        {episodeDetails?.season_number || ""}
                                    </div>
                                </div>
                                <div className="episode-num">
                                    <div className="episode-no-hd">Episode</div>
                                    <div className="episode-no">
                                        {episodeDetails?.season_number || ""}
                                    </div>
                                </div>
                                <div className="explicit">
                                    <div className="explicit-hd">Explicit</div>
                                    <div className="explicit-value">
                                        {explicitValue[
                                            episodeDetails?.content_option
                                        ] || ""}
                                    </div>
                                </div>
                            </div>
                            {episodeDetails?.podcast_info?.is_published && (
                                <div className="episode-live-status">
                                    {episodeDetails?.is_published
                                        ?.toString()
                                        .toLowerCase() === "true" ? (
                                        <div className="status">
                                            <div className="status-hd">
                                                {`Made Live on ${commonData.formatDate(
                                                    episodeDetails?.publish_date,
                                                    "DD MMM YYYY"
                                                )}`}
                                            </div>
                                            <div className="live-circle">
                                                <div className="live-symbol"></div>
                                                <div className="red-symbol"></div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="status">
                                            <div className="status-hd">
                                                Make it Live
                                            </div>
                                            <div className="not-live">
                                                NOT LIVE
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="episode-players">
                            <div className="audio-player">
                                <CustomAudioPlayer
                                    audioURL={episodeDetails?.episode_file}
                                    hideCloseIcon
                                    audioName={
                                        episodeDetails?.episode_file_name
                                    }
                                    audioSize={
                                        episodeDetails?.episode_file_size
                                    }
                                />
                                <div className="episode-description">
                                    {episodeDetails?.description || ""}
                                </div>
                            </div>
                            <div className="creations">
                                <div className="podclip-creation">
                                    <div className="pod-clip">
                                        Create Podclip
                                    </div>
                                    <div className="podclip-desc">
                                        Podclip is a video file of your podcast
                                        ready to be shared on your social media
                                        profiles.
                                    </div>
                                </div>
                                <div className="plog-creation">
                                    <div className="plog">Create Plog</div>
                                    <div className="plog-desc">
                                        Plog is a transcript of your podcast to
                                        be used for your blog, if any.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
