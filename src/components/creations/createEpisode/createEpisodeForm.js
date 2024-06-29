import React, { PureComponent } from "react";
import axios from "axios";
import {
  CustomTextArea as TextArea,
  CustomTextInput as TextInput,
  CustomFileUpload,
  CustomButton,
  CustomAudioLoader,
  CustomAudioPlayer,
  CustomDropDown,
} from "../../customComponents";
import CreateEpisodeShimmer from "../../shimmers/createEpisodeShimmer";
import commonData from "../../../utils/common";
import Media from "react-media";

const explicitOptions = [
  { text: "Clean", value: 1 },
  { text: "Explicit", value: 2 },
];

const episodeLiveOptions = [
  { text: "Now, Just after saving the episode", value: "True" },
  { text: "I will do it later", value: "False" },
];

const CancelToken = axios.CancelToken;

export default class CreateEpisode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      episodeName: "",
      description: "",
      seasonNumber: 1,
      episodeNumber: props.allEpisodes?.length + 1 || 1,
      coverArtName: "",
      explicitContent: "Clean",
      episodeLive: "True",
      episodeMetaData: {},
      episodeFileName: "",
      audioFileSize: "",
      imageData: {},
      formValidations: {
        episodeName: this.getFormValidationValues(),
        description: this.getFormValidationValues(),
        seasonNumber: this.getFormValidationValues(),
        episodeNumber: this.getFormValidationValues(),
        explicitContent: this.getFormValidationValues(),
      },
    };

    this.source = CancelToken.source();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps?.episodeMediaMetaData) !==
      JSON.stringify(this.props?.episodeMediaMetaData)
    ) {
      this.setState({
        episodeMetaData: nextProps?.episodeMediaMetaData,
      });
    }
    if (
      JSON.stringify(nextProps?.imageData) !==
      JSON.stringify(this.props?.imageData)
    ) {
      this.setState({
        imageData: nextProps?.imageData,
      });
    }
    if (this.props.editView) {
      this.setState({
        episodeName: nextProps?.episodeAutoPopulateData?.name,
        description: nextProps?.episodeAutoPopulateData?.description,
        seasonNumber: nextProps?.episodeAutoPopulateData?.season_number,
        episodeNumber: nextProps?.episodeAutoPopulateData?.episode_number,
        explicitContent: nextProps?.episodeAutoPopulateData?.content_option,
        episodeMetaData: nextProps?.episodeAutoPopulateData?.episode_file_id,
      });
    }
  }

  getFormValidationValues = () => {
    return {
      error: false,
      msg: "",
    };
  };

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    const { formValidations } = this.state;
    if (name && formValidations[name].error) {
      this.setValidationErrorState(false, "", name);
    }
    this.setState({
      [name]: value,
    });
  };

  selectDropdownOptions = (event, value, name) => {
    this.setState({
      [name]: value,
    });
  };

  uploadFile = (e, isEpisodeFile) => {
    const { podcastData } = this.props;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file_object", file);
    formData.append("is_episode_file", isEpisodeFile);
    formData.append("podcast_id", podcastData?.podcast_id ?? "");
    if (!isEpisodeFile) {
      this.setState({
        coverArtName: file?.name,
      });
    } else {
      let audioFileSize = (file?.size / 1000000).toFixed(2) + "MB";
      this.setState({
        episodeFileName: file?.name,
        audioFileSize,
      });
    }
    this.props.uploadFile({
      formData: formData,
      cancelToken: this.source.token,
      showUploadProgress: true,
      uploadProgress: commonData.uploadProgress,
    });
  };

  setValidationErrorState = (error, msg, fieldName) => {
    this.setState((prevState) => ({
      ...prevState,
      formValidations: {
        ...prevState.formValidations,
        [fieldName]: {
          error: error,
          msg: msg,
        },
      },
    }));
  };

  mapStateToName = () => {
    return {
      episodeName: "Please enter Episode Name",
      description: "Please enter Description",
      seasonNumber: "Please enter Season Number",
      episodeNumber: "Please enter Episode Number",
      explicitContent: "Please select Explicit Content",
      episodeFile: "Please upload episode file",
    };
  };

  createNewEpisode = () => {
    const {
      episodeName,
      description,
      seasonNumber,
      episodeNumber,
      explicitContent,
      formValidations,
      episodeMetaData,
      imageData,
      episodeLive,
    } = this.state;
    const { podcastData, editView, episodeAutoPopulateData } = this.props;
    const episodeFile = editView ? episodeMetaData : episodeMetaData?.file_key;
    let reqData = {
      name: episodeName,
      description: description,
      season_number: seasonNumber,
      episode_number: episodeNumber,
      content_option: explicitContent,
      podcast_id: podcastData?.podcast_id ?? "",
      episode_file: episodeFile,
      is_published: podcastData?.is_published ? episodeLive : "False",
    };
    if (imageData?.file_key) {
      reqData["cover_art"] = imageData?.file_key;
    }
    if (editView) {
      reqData["episode_id"] = episodeAutoPopulateData?.episode_id;
      reqData["is_published"] =
        episodeAutoPopulateData?.is_published?.toString()?.toLowerCase() ===
        "true"
          ? "True"
          : "False";
    }
    let isFormValid = true;
    for (const fieldName of Object.keys(formValidations)) {
      if (
        (this.state[fieldName] !== "cover_art" &&
          typeof this.state[fieldName] === "string" &&
          !this.state[fieldName]) ||
        (Array.isArray(this.state[fieldName]) &&
          this.state[fieldName]?.length === 0)
      ) {
        isFormValid = false;
        this.setValidationErrorState(
          true,
          this.mapStateToName()[fieldName],
          fieldName
        );
      }
    }

    if (isFormValid) {
      if (editView) {
        this.props.updateEpisode(reqData);
        this.props.closeUpdateDialog();
      } else {
        this.props.createEpisode(reqData);
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  abortUploadAPI = () => {
    this.source.cancel();
    this.source = axios.CancelToken.source();
  };

  renderEpisodeComponent = () => {
    const { episodeMetaData, episodeFileName, audioFileSize } = this.state;
    const { audioLoader } = this.props;

    if (audioLoader) {
      return <CustomAudioLoader onCloseEpisodeUpload={this.abortUploadAPI} />;
    } else if (Object.keys(episodeMetaData || {}).length > 0) {
      return (
        <CustomAudioPlayer
          audioName={episodeFileName}
          audioSize={audioFileSize}
          onDelete={() => {
            this.setState({
              episodeMetaData: {},
            });
          }}
          audioURL={episodeMetaData?.file_url}
        />
      );
    } else {
      return <CustomFileUpload onChange={(e) => this.uploadFile(e, true)} />;
    }
  };

  getDropDownValue = () => {
    const { explicitContent } = this.state;
    const res = explicitOptions.filter(
      (option) => option.text === explicitContent
    )[0];
    return res?.value;
  };

  getEpisdoeDropDownValue = () => {
    const { episodeLive } = this.state;
    const res = episodeLiveOptions.filter(
      (option) => option.value === episodeLive
    )[0];
    return res?.value;
  };

  render() {
    const {
      episodeName,
      description,
      seasonNumber,
      episodeNumber,
      formValidations,
      episodeMetaData,
    } = this.state;
    const {
      showLoader,
      editView = false,
      isCreateNewEpisode,
      onNewEpisodeCross,
      podcastData,
    } = this.props;
    return (
      <>
        {showLoader ? (
          <CreateEpisodeShimmer />
        ) : (
          <div
            className="create-episode-container"
            style={{ marginBottom: editView && "0px" }}
          >
            <div className="step-2-form">
              {!editView && (
                <>
                  <div className="step-2-header">
                    <div className="episode-create">
                      {!isCreateNewEpisode && (
                        <div className="step-2-hd">STEP 2</div>
                      )}
                      <div className="create-episode-hd">
                        {isCreateNewEpisode
                          ? "Create New Episode"
                          : "Add Your First Episode"}
                      </div>
                    </div>

                    {isCreateNewEpisode && (
                      <div
                        className="cross-icon-wrapper"
                        onClick={() => {
                          this.abortUploadAPI();
                          onNewEpisodeCross();
                        }}
                      >
                        <div className="cross-icon">+</div>
                      </div>
                    )}
                  </div>

                  <div className="custom-file-upload">
                    {this.renderEpisodeComponent()}
                  </div>
                </>
              )}
              <div className="create-ep-form">
                <div className="create-ep-form-element">
                  <TextInput
                    label="Episode Name"
                    name="episodeName"
                    placeholder="e.g. A talk on something"
                    helperText={
                      formValidations.episodeName["error"]
                        ? formValidations.episodeName["msg"]
                        : "Don’t hesitate to give a catchy name"
                    }
                    value={episodeName}
                    error={formValidations.episodeName["error"]}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="create-ep-form-element">
                  <TextArea
                    label="Description"
                    name="description"
                    placeholder="Write something amazing about this episode"
                    helperText={
                      formValidations.description["error"]
                        ? formValidations.description["msg"]
                        : "Try to keep it concise"
                    }
                    value={description}
                    error={formValidations.description["error"]}
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="create-ep-form-element">
                  <div className="season-episode-numbers">
                    <TextInput
                      label="Season Number"
                      name="seasonNumber"
                      type="number"
                      value={seasonNumber}
                      error={formValidations.seasonNumber["error"]}
                      helperText={formValidations.seasonNumber["msg"]}
                      onChange={this.handleInputChange}
                    />
                    <TextInput
                      label="Episode Number"
                      name="episodeNumber"
                      type="number"
                      value={episodeNumber}
                      error={formValidations.episodeNumber["error"]}
                      helperText={formValidations.episodeNumber["msg"]}
                      onChange={this.handleInputChange}
                    />
                  </div>
                </div>
                <div className="create-ep-form-element">
                  <CustomDropDown
                    label="Explicit Content ?"
                    onChange={(event, text, value, i) =>
                      this.selectDropdownOptions(event, text, "explicitContent")
                    }
                    value={parseInt(this.getDropDownValue())}
                    placeholder="Write something amazing about your podcast"
                    data={explicitOptions}
                  />
                </div>
                {podcastData?.is_published && (
                  <div className="create-ep-form-element">
                    <CustomDropDown
                      label="Make Episode Live ?"
                      onChange={(event, text, value, i) =>
                        this.selectDropdownOptions(event, value, "episodeLive")
                      }
                      value={this.getEpisdoeDropDownValue()}
                      placeholder="Write something amazing about your podcast"
                      data={episodeLiveOptions}
                    />
                  </div>
                )}
                <div className="create-ep-form-element">
                  {!editView && (
                    <Media query="(max-width: 425px)">
                      {(matches) =>
                        matches ? (
                          <div className="mobile-button">
                            <CustomButton
                              disabled={
                                !Object.keys(episodeMetaData || {}).length > 0
                              }
                              primary
                              label="Save Episode"
                              onClick={this.createNewEpisode}
                            />
                          </div>
                        ) : (
                          <CustomButton
                            disabled={
                              !Object.keys(episodeMetaData || {}).length > 0
                            }
                            primary
                            label="Save Episode"
                            onClick={this.createNewEpisode}
                          />
                        )
                      }
                    </Media>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
