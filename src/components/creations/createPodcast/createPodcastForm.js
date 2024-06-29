import React, { PureComponent } from "react";
import {
  CustomCoverartUpload,
  CustomTextArea as TextArea,
  CustomTextInput as TextInput,
  CustomButton,
  CustomDropDown as Dropdown,
} from "../../customComponents";
import CreatePodcastShimmer from "../../shimmers/createPodcastShimmer";
import { isProdURL } from "../../../utils/api";
import { isMobile } from "react-device-detect";
import Media from "react-media";

export default class CreatePodcast extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      coverart:
        "https://d1c96ibfqnjdes.cloudfront.net/uploads/ainurcast-dev/file_1617645140.png",
      categories: [],
      languages: [],
      language: [],
      category: [],
      coverArtFileKey: isProdURL()
        ? "ee33b8d1-1b20-47af-9851-9264742b0164"
        : "38a588d5-f431-4c8b-b558-0c74b0ecc3c2",
      coverArtName: "",
      formValidations: {
        name: this.getFormValidationValues(),
        description: this.getFormValidationValues(),
        coverArtFileKey: this.getFormValidationValues(),
        language: this.getFormValidationValues(),
        category: this.getFormValidationValues(),
      },
      selectedValue: "0",
      coverArtSizeErr: false,
    };
  }

  componentWillMount() {
    if (localStorage.getItem("USER-CODE")) {
      this.props.getDropdownData(this.props.editPodcast || false);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps?.dropDownData) !==
      JSON.stringify(this.props?.dropDownData)
    ) {
      this.setDropDownData(nextProps?.dropDownData ?? {});
    }
    if (
      JSON.stringify(nextProps?.imageData) !==
      JSON.stringify(this.props?.imageData)
    ) {
      this.setState({
        coverart: nextProps?.imageData?.file_url,
        coverArtFileKey: nextProps?.imageData?.file_key,
      });
    } else if (nextProps?.editPodcast) {
      const {
        podcastData: {
          name = "",
          description = "",
          cover_art = "",
          categories = [],
          language = [],
          cover_art_id = "",
          podcast_id = "",
        },
      } = nextProps;
      this.setDropDownData(nextProps?.dropDownData ?? {});
      this.setState({
        name: name,
        description: description,
        coverart: cover_art,
        category: this.getCategory(categories),
        language: this.getLanguage(language?.[0]?.name ?? ""),
        coverArtFileKey: cover_art_id,
        podcastId: podcast_id,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { categories, languages, category, language } = this.state;
    if (
      prevState?.categories?.length !== categories?.length &&
      !category?.length
    ) {
      this.setDropdownOptions("", categories?.[0]?.value, "category");
    }
    if (
      prevState?.languages?.length !== languages?.length &&
      !language?.length
    ) {
      this.setDropdownOptions("", languages?.[0]?.value, "language");
    }
  }

  getLanguage = (language) => {
    const { languages } = this.state;
    let formattedLanguage = [];
    if (languages?.length) {
      const res = languages?.filter((option) => option.text === language)[0]
        ?.value;
      formattedLanguage.push(res);
      return JSON.stringify(formattedLanguage);
    }
  };

  getCategory = (mulSelCategories) => {
    // get first values since it is not multiselect for now
    const { categories } = this.state;
    let formattedCategory = [];
    if (categories?.length) {
      const filteredCategory = categories?.filter(
        (category) => category.value === mulSelCategories?.[0]?.pk
      )?.[0]?.value;
      formattedCategory.push(filteredCategory);
      return JSON.stringify(formattedCategory);
    }
  };

  setDropDownData = (ddData) => {
    this.formatDropDownData(ddData?.category_options, "categories");
    this.formatDropDownData(ddData?.language_options, "languages");
  };

  getFormValidationValues = () => {
    return {
      error: false,
      msg: "",
    };
  };

  formatDropDownData = (data, type) => {
    if (data) {
      const alteredData = data?.map((item) => {
        return {
          text:
            type === "categories"
              ? `${item.category} :: ${item.sub_category}`
              : item.display_name,
          value: item._id,
        };
      });
      this.setState({ [type]: alteredData });
    }
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

  setDropdownOptions = (event, value, name) => {
    let ddValue = [];
    ddValue.push(value);
    this.setState({
      [name]: JSON.stringify(ddValue),
    });
  };

  uploadFile = (e) => {
    const img = e.target.files[0];
    let imageType = new Image();
    imageType.src = window.URL.createObjectURL(img);
    imageType.onload = () => {
      if (
        imageType.width >= 1400 &&
        imageType.width <= 3000 &&
        imageType.height >= 1400 &&
        imageType.height <= 3000
      ) {
        const formData = new FormData();
        formData.append("file_object", img);
        // formData.append("is_episode_file", false);
        formData.append("generic", true);
        this.setState({
          coverArtName: img.name,
          coverArtSizeErr: false,
        });
        this.props.uploadFile({ formData: formData });
      } else {
        this.setState({
          coverArtSizeErr: true,
        });
      }
    };
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
      name: "Please enter Podcast Name",
      description: "Please enter Description",
      coverart: "Please upload Podcast Cover Art",
      language: "Please select language",
      category: "Please select category",
    };
  };

  createNewPodcast = () => {
    const {
      name,
      description,
      category,
      coverArtFileKey,
      language,
      formValidations,
    } = this.state;
    const { editPodcast = false, closeEditPodcast = () => {} } = this.props;
    let reqData = {
      name: name,
      description: description,
      cover_art: coverArtFileKey,
      categories: category,
      language: language,
    };
    let isFormValid = true;
    for (const fieldName of Object.keys(formValidations)) {
      if (
        (typeof this.state[fieldName] === "string" && !this.state[fieldName]) ||
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
      if (editPodcast) {
        const { podcastId } = this.state;
        reqData["podcast_id"] = podcastId;
        this.props.updatePodcast(reqData);
        closeEditPodcast();
      } else {
        this.props.createPodcast(reqData);
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  getNewDropDownValue = (type, ddType) => {
    if (this.state[type] && this.state[type]?.length) {
      return JSON.parse(this.state[type] || "")?.[0];
    }
    return "";
  };

  handleDropDownChange = (e, text, value, i) => {
    this.setState({
      selectedValue: value,
    });
  };

  render() {
    const {
      name,
      description,
      categories,
      languages,
      coverArtName,
      formValidations,
      coverart,
      selectedValue,
      coverArtSizeErr,
    } = this.state;
    const {
      showLoader,
      editPodcast,
      closeEditPodcast = () => {},
      userDetails,
    } = this.props;
    return (
      <>
        {showLoader ? (
          <CreatePodcastShimmer />
        ) : (
          <div className="create-podcast-container">
            <div className="create-podcast-form">
              {!editPodcast && (
                <>
                  <div className="welcome-msg">
                    Welcome{" "}
                    <span className="user-name">
                      {userDetails?.first_name || ""}
                    </span>
                  </div>
                  <div className="steps-guide">
                    Publish your podcast by following 3 steps starting below.
                  </div>
                </>
              )}
              <div className="step-1-header" data-space={editPodcast}>
                {!editPodcast && <div className="step-1-hd">STEP 1</div>}
                <div className="create-podcast-hd">
                  {editPodcast ? "Edit Podcast" : "Create Your Podcast"}
                </div>
                {editPodcast && (
                  <div
                    className="cross-icon-wrapper"
                    onClick={() => closeEditPodcast()}
                  >
                    <div className="cross-icon">+</div>
                  </div>
                )}
              </div>
              <div className="cover-art-upload">
                <CustomCoverartUpload
                  imageURL={coverart || ""}
                  coverArtName={coverArtName}
                  onChange={(e) => this.uploadFile(e)}
                  coverArtSizeErr={coverArtSizeErr}
                />
                <div className="cover-art-upload-guideliness">
                  <div className="attach-cover-art-guide">
                    {isMobile
                      ? "Tap on the area to attach your podcast cover-art"
                      : "Click to attach your podcast cover-art"}
                  </div>
                  <div className="file-size-guide">
                    Cover art should be square shaped in .jpg or .png between (
                    1400px by 1400px ) to ( 3000px by 3000px )
                  </div>
                  <div className="placeholder-msg">
                    We have already put up one as a placeholder in case you
                    don’t have one now.
                  </div>
                </div>
              </div>
              <div className="create-pc-form">
                <div className="create-pc-form-element">
                  <TextInput
                    label="Podcast Name"
                    name="name"
                    placeholder="e.g. John speaks"
                    error={formValidations.name["error"]}
                    helperText={
                      formValidations.name["error"]
                        ? formValidations.name["msg"]
                        : "Don’t hesitate to give a catchy name"
                    }
                    onChange={this.handleInputChange}
                    value={name}
                  />
                </div>
                <div className="create-pc-form-element">
                  <TextArea
                    label="Description"
                    name="description"
                    placeholder="Write something amazing about your podcast"
                    error={formValidations.description["error"]}
                    helperText={
                      formValidations.description["error"]
                        ? formValidations.description["msg"]
                        : "Try to keep it concise"
                    }
                    onChange={this.handleInputChange}
                    value={description}
                  />
                </div>
                <div className="create-pc-form-element">
                  <Dropdown
                    label="Podcast Categories"
                    onChange={(event, text, value, i) =>
                      this.setDropdownOptions(event, value, "category")
                    }
                    value={this.getNewDropDownValue("category", "categories")}
                    placeholder="Write something amazing about your podcast"
                    data={categories}
                  />
                </div>
                <div className="create-pc-form-element">
                  <Dropdown
                    label="Podcast Languages"
                    onChange={(event, text, value, i) =>
                      this.setDropdownOptions(event, value, "language")
                    }
                    value={this.getNewDropDownValue("language", "languages")}
                    placeholder="Write something amazing about your podcast"
                    data={languages}
                  />
                </div>
                <div className="create-pc-form-element">
                  <Media query="(max-width: 425px)">
                    {(matches) =>
                      matches ? (
                        <div className="mobile-button">
                          <CustomButton
                            primary
                            label={
                              editPodcast ? "Save Changes" : "Create Podcast"
                            }
                            onClick={this.createNewPodcast}
                          />
                        </div>
                      ) : (
                        <CustomButton
                          primary
                          label={
                            editPodcast ? "Save Changes" : "Create Podcast"
                          }
                          onClick={this.createNewPodcast}
                        />
                      )
                    }
                  </Media>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
