import React, { PureComponent } from "react";
import IllustrationImageShimmer from "../shimmers/illustrationImageShimmer";
import CreateEpisode from "./createEpisode/createEpisodeForm";
import CreatePodcast from "./createPodcast/createPodcastForm";
import EpisodeList from "./episodeList";
import GenericStepDetails from "./genericStepDetails";
import history from "../../utils/history";
import Media from "react-media";
import { CustomButton } from "../customComponents";

export default class StepWiseCreations extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber: 1,
      showEpisodeList: true,
      showEditPodcast: false,
      showMobileCreateEpisodeComp: false,
      showMobileEpisodeList: false,
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("USER-CODE")) {
      history.push("/auth");
    } else {
      this.props.getPodcast();
      this.props.getUserDetails();
    }
  }

  componentWillUnmount() {
    this.props.clearReducer();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.podcastData?.podcast_id !== this.props.podcastData?.podcast_id
    ) {
      this.setState({
        stepNumber: 2,
      });
    }
    if (nextProps.podcastData?.podcast_id && nextProps?.allEpisodes?.length) {
      if (nextProps?.allEpisodes?.length !== this.props?.allEpisodes?.length) {
        this.setState({
          showEpisodeList: true,
        });
      }
      this.setState({
        stepNumber: 3,
      });
    }
  }

  returnIllustrationImage = () => {
    const { showLoader } = this.props;
    return showLoader ? (
      <IllustrationImageShimmer />
    ) : (
      <img src="/assets/Illustration.svg" alt="illustration" />
    );
  };

  renderLeftSideComponent = () => {
    const {
      stepNumber,
      showEditPodcast,
      showMobileCreateEpisodeComp,
      showMobileEpisodeList
    } = this.state;
    switch (stepNumber) {
      case 1:
        return <CreatePodcast {...this.props} />;
      case 2:
        if (showEditPodcast) {
          return (
            <CreatePodcast
              closeEditPodcast={() => {
                this.setState({
                  showEditPodcast: false,
                });
              }}
              editPodcast
              {...this.props}
            />
          );
        } else {
          if (!showMobileCreateEpisodeComp) {
            return (
              <GenericStepDetails
                {...this.props}
                onEditPodcastClick={() =>
                  this.setState({
                    showEditPodcast: true,
                  })
                }
                stepNumber={stepNumber}
              />
            );
          } else return null;
        }
      case 3:
        if (showEditPodcast) {
          return (
            <CreatePodcast
              closeEditPodcast={() => {
                this.setState({
                  showEditPodcast: false,
                });
              }}
              editPodcast
              {...this.props}
            />
          );
        } else {
            if(!showMobileEpisodeList){
                return (
                    <GenericStepDetails
                      {...this.props}
                      onEditPodcastClick={() =>
                        this.setState({
                          showEditPodcast: true,
                        })
                      }
                      stepNumber={stepNumber}
                    />
                  );
            } else return null;
        }
      default:
        return <div>No Data to display</div>;
    }
  };

  renderRighttSideComponent = () => {
    const {
      stepNumber,
      showEpisodeList,
      showEditPodcast,
      showMobileCreateEpisodeComp,
      showMobileEpisodeList
    } = this.state;
    switch (stepNumber) {
      case 1:
        return (
          <Media query="(max-width: 768px)">
            {(matches) => (matches ? null : this.returnIllustrationImage())}
          </Media>
        );
      case 2:
        if (showMobileCreateEpisodeComp) {
          return <CreateEpisode {...this.props} />;
        } else {
          return (
            <Media query="(max-width: 768px)">
              {(matches) =>
                matches ? (
                  !showEditPodcast && (
                    <div className="mobile-button">
                      <CustomButton
                        primary
                        label={"STEP 2 : Add Your First Episode"}
                        onClick={() =>
                          this.setState({ showMobileCreateEpisodeComp: true })
                        }
                      />
                    </div>
                  )
                ) : (
                  <CreateEpisode {...this.props} />
                )
              }
            </Media>
          );
        }

      case 3:
        if (showEpisodeList) {
          return (
            <Media query="(max-width: 768px)">
              {(matches) => {
                if (matches && !showMobileEpisodeList) {
                  return (
                    !showEditPodcast && <div className="mobile-button">
                      <CustomButton
                        primary
                        label={"Episodes"}
                        style={{ justifyContent: "space-between" }}
                        endIcon={<img src="/assets/delete.svg" alt="forward" />}
                        onClick={() =>
                          this.setState({ showMobileEpisodeList: true })
                        }
                      />
                    </div>
                  );
                } else
                  return (
                    <EpisodeList
                      onNewEpisodeClick={() =>
                        this.setState({
                          showEpisodeList: false,
                        })
                      }
                      onMobileBackClick={() => this.setState({
                        showMobileEpisodeList: false,
                      })}
                      {...this.props}
                    />
                  );
              }}
            </Media>
          );
        } else {
          return (
            <CreateEpisode
              isCreateNewEpisode
              onNewEpisodeCross={() =>
                this.setState({
                  showEpisodeList: true,
                })
              }
              {...this.props}
            />
          );
        }
      default:
        return <div>No Data to display</div>;
    }
  };

  render() {
    return (
      <div className="step-wise-creations">
        <div className="left-side-container">
          {this.renderLeftSideComponent()}
        </div>
        <div className="right-side-container">
          {this.renderRighttSideComponent()}
        </div>
      </div>
    );
  }
}
