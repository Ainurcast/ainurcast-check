import React, { Component } from "react";
import Header from "../home/header";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CircularProgress from "@material-ui/core/CircularProgress";
import history from "../../utils/history";
import {
    CustomButton,
    CustomDialog as Dialog,
    CustomTextInput as TextInput,
    IconButton,
} from "../customComponents";
import constantData from "../../utils/constants";
import Media from "react-media";

const {
    passWordQualityCountMap,
    passwordTypeClassMap,
    passwordQualityStateMap,
    confirmPasswordData,
} = constantData;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openCPDialog: false,
            oldPassword: "",
            newPassword: "",
            eyeIconStatus: {
                showOldPassword: false,
                showNewPassword: false,
            },
            showPasswordError: {
                showOldPasswordError: false,
                showNewPasswordError: false,
            },
            showPasswordErrorMsg: {
                showOldPasswordErrorMsg: "",
                showNewPasswordErrorMsg: "",
            },
            passwordQualityStates: {
                upperLower: false,
                number: false,
                specialCharacter: false,
            },
            showPasswordValidation: false,
            profileFileName: "",
            imageData: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (
            JSON.stringify(nextProps?.imageData) !==
            JSON.stringify(this.props?.imageData)
        ) {
            this.setState(
                {
                    imageData: nextProps.imageData,
                },
                () => {
                    const { userDetails } = this.props;
                    this.props.updateUserDetails({
                        first_name: userDetails?.first_name,
                        last_name: userDetails?.last_name,
                        email: userDetails?.email,
                        profile_img_id: nextProps?.imageData?.file_key,
                    });
                }
            );
        }
    }
    
    componentDidMount() {
        // if (!localStorage.getItem("USER-CODE")) {
        //   history.push("/auth");
        // } else {
            this.props.getUserDetails(true);
        // }
      }

  

    setPasswordQualityState = (type, value) => {
        this.setState((prevState) => ({
            ...prevState,
            passwordQualityStates: {
                ...prevState.passwordQualityStates,
                [type]: value,
            },
        }));
    };

    getPwdTypeCount = () => {
        const { passwordQualityStates } = this.state;
        let c = 0;
        for (let key of Object.keys(passwordQualityStates)) {
            if (passwordQualityStates[key]) {
                c += 1;
            }
        }
        return c;
    };

    toggleCPDialog = () => {
        const { openCPDialog } = this.state;
        this.setState({
            openCPDialog: !openCPDialog,
            oldPassword: "",
            newPassword: "",
            showPasswordError: {
                showOldPasswordError: false,
                showNewPasswordError: false,
            },
            showPasswordErrorMsg: {
                showOldPasswordErrorMsg: "",
                showNewPasswordErrorMsg: "",
            },
        });
    };

    handleChangeInput = (e, value, type) => {
        if (type === "newPassword") {
            this.setPasswordQualityState(
                "upperLower",
                new RegExp("^(?=.*[A-Z])").test(value) &&
                    new RegExp("^(?=.*[a-z])").test(value)
            );
            this.setPasswordQualityState(
                "specialCharacter",
                new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).test(value)
            );
            this.setPasswordQualityState(
                "number",
                new RegExp(/\d/).test(value)
            );
        }
        this.setState({
            [type]: value,
            showPasswordError: {
                showOldPasswordError: false,
                showNewPasswordError: false,
            },
            showPasswordErrorMsg: {
                showOldPasswordErrorMsg: "",
                showNewPasswordErrorMsg: "",
            },
        });
    };

    handleEyeIcon = (eyeIcon) => {
        this.setState((prevState) => ({
            ...prevState,
            eyeIconStatus: {
                ...prevState.eyeIconStatus,
                [eyeIcon]: !prevState.eyeIconStatus[eyeIcon],
            },
        }));
    };

    saveNewPassword = () => {
        const {
            oldPassword,
            newPassword,
            showPasswordError,
            showPasswordErrorMsg,
        } = this.state;
        if (!oldPassword) {
            this.setState((prevState) => ({
                ...prevState,
                showPasswordError: {
                    ...showPasswordError,
                    showOldPasswordError: true,
                },
                showPasswordErrorMsg: {
                    ...showPasswordErrorMsg,
                    showOldPasswordErrorMsg: "Old Password is Mandatory",
                },
            }));
        } else if (!newPassword) {
            this.setState((prevState) => ({
                ...prevState,
                showPasswordError: {
                    ...showPasswordError,
                    showNewPasswordError: true,
                },
                showPasswordErrorMsg: {
                    ...showPasswordErrorMsg,
                    showNewPasswordErrorMsg: "New Password is Mandatory",
                },
            }));
        } else if (newPassword === oldPassword) {
            this.setState((prevState) => ({
                ...prevState,
                showPasswordError: {
                    ...showPasswordError,
                    showNewPasswordError: true,
                },
                showPasswordErrorMsg: {
                    ...showPasswordErrorMsg,
                    showNewPasswordErrorMsg:
                        "New Password should be different from Old Password",
                },
            }));
        } else {
            const query = {
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: newPassword,
            };
            this.setState(
                {
                    openCPDialog: false,
                    oldPassword: "",
                    newPassword: "",
                },
                () => this.props.changePassword(query)
            );
        }
    };

    togglePasswordValidation = (type) => {
        if (type === "New Password") {
            const { showPasswordValidation } = this.state;
            this.setState({
                showPasswordValidation: !showPasswordValidation,
            });
        }
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    getLogoutButton = () => {
        return (
            <Media query="(max-width: 768px)">
                {(matches) =>
                    matches ? (
                        <img
                            src="/assets/logout.svg"
                            alt="logout-svg"
                            width={24}
                            height={24}
                            className="logout-img"
                        />
                    ) : (
                        <>
                            <img
                                src="/assets/logout.svg"
                                alt="logout-svg"
                                width={24}
                                height={24}
                                className="logout-img"
                            />
                            <span>Log out</span>
                        </>
                    )
                }
            </Media>
        );
    };

    handleUploadFile = (e) => {
        const img = e.target.files[0];
        const formData = new FormData();
        formData.append("file_object", img);
        formData.append("is_episode_file", false);
        formData.append("profile_update", true);
        this.setState({
            profileFileName: img?.name || "",
        });
        this.props.uploadFile({ formData: formData });
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
            openCPDialog,
            eyeIconStatus,
            showPasswordError,
            showPasswordErrorMsg,
            passwordQualityStates,
            showPasswordValidation,
            profileFileName,
            imageData: { file_url = "" },
        } = this.state;
        const { showLoader, userDetails } = this.props;
        const pwdTypeCount = this.getPwdTypeCount();
        return (
            <div>
                <Media query="(max-width: 425px)">
                    {(matches) =>
                        matches ? null : (
                            <>
                                <Header userDetails={userDetails} />
                            </>
                        )
                    }
                </Media>
                <div className="profile-container">
                    <div className="profile-header">
                        <div className="hd-left">
                            <div className="arrow-left">
                                <ArrowBackIcon
                                    onClick={() => history.goBack()}
                                />
                            </div>
                            <div className="my-profile">My Profile</div>
                        </div>
                        <CustomButton
                            label={this.getLogoutButton()}
                            onClick={() => {
                                localStorage.clear();
                                history.push("/auth");
                            }}
                        />
                    </div>
                    <div className="profile-details">
                        <div className="profile-pic-container">
                            <div className="profile-pic">
                                <img
                                    src={
                                        file_url
                                            ? file_url
                                            : userDetails?.profile_img ||
                                              "/assets/default-profile.svg"
                                    }
                                    alt="profile-pic"
                                />
                                <input
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={this.handleUploadFile}
                                />
                            </div>
                            <div className="edit-cover-art">
                                <img
                                    src="/assets/edit.svg"
                                    alt="modify-cover-art"
                                />
                                <span className="modify-btn">Modify</span>
                            </div>
                            <div className="my-photo">
                                {profileFileName
                                    ? profileFileName
                                    : userDetails?.profile_img_name ||
                                      "My Photo.jpg"}
                            </div>
                        </div>
                        <div className="profile-details-container">
                            <div className="pro-name">
                                {`${userDetails?.first_name || ""} ${
                                    userDetails?.last_name || ""
                                }`}
                            </div>
                            <div className="pro-email">
                                {userDetails?.email || ""}
                            </div>
                            <CustomButton
                                label={"Change Password"}
                                onClick={this.toggleCPDialog}
                            />
                        </div>
                    </div>
                </div>

                <Dialog
                    {...this.getMobileProps()}
                    open={openCPDialog}
                    title={"Change Password"}
                    onClose={this.toggleCPDialog}
                    showCrossIcon
                    actions={[
                        <CustomButton
                            key={0}
                            label="Save New Password"
                            primary
                            customButtonStyle={{ width: "100%" }}
                            onClick={this.saveNewPassword}
                            onMouseDown={this.handleMouseDownPassword}
                        />,
                    ]}
                >
                    {confirmPasswordData.map((inputData, i) => {
                        const {
                            label,
                            stateName,
                            eyeIcon,
                            showError,
                            errorMsg,
                        } = inputData;
                        return (
                            <div
                                key={`confirm-text-${i}`}
                                className="confirm-password-txt-input"
                            >
                                <TextInput
                                    label={label}
                                    passwordField
                                    type={
                                        eyeIconStatus[eyeIcon]
                                            ? "text"
                                            : "password"
                                    }
                                    onBlur={() =>
                                        this.togglePasswordValidation(label)
                                    }
                                    onFocus={() =>
                                        this.togglePasswordValidation(label)
                                    }
                                    error={showPasswordError[showError]}
                                    helperText={showPasswordErrorMsg[errorMsg]}
                                    inputProps={
                                        <IconButton
                                            onClick={() =>
                                                this.handleEyeIcon(eyeIcon)
                                            }
                                            onMouseDown={
                                                this.handleMouseDownPassword
                                            }
                                        >
                                            {eyeIconStatus[eyeIcon] ? (
                                                <img
                                                    src="/assets/eye-close.svg"
                                                    alt="visibility-off"
                                                />
                                            ) : (
                                                <img
                                                    src="/assets/eye-open.svg"
                                                    alt="visibility"
                                                />
                                            )}
                                        </IconButton>
                                    }
                                    value={this.state[stateName]}
                                    onChange={(e, value) =>
                                        this.handleChangeInput(
                                            e,
                                            value,
                                            stateName
                                        )
                                    }
                                />
                                {showPasswordValidation &&
                                    label === "New Password" && (
                                        <div className="password-quality-chks">
                                            <div className="pwd-quality">
                                                {passwordQualityStateMap.map(
                                                    (field, i) => {
                                                        return (
                                                            <div className="pwd-quality-wrapper">
                                                                <div className="icon">
                                                                    <img
                                                                        width={
                                                                            14
                                                                        }
                                                                        height={
                                                                            14
                                                                        }
                                                                        src={
                                                                            passwordQualityStates[
                                                                                field
                                                                                    .state
                                                                            ]
                                                                                ? "/assets/tick.svg"
                                                                                : "/assets/unticked.svg"
                                                                        }
                                                                        alt="icon"
                                                                    />
                                                                </div>
                                                                <div className="msg">
                                                                    {field.msg}
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            {this.state[stateName].length >
                                                0 && (
                                                <div
                                                    className={`pwd-type ${passwordTypeClassMap[pwdTypeCount]}`}
                                                >
                                                    {
                                                        passWordQualityCountMap[
                                                            pwdTypeCount
                                                        ]
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    )}
                            </div>
                        );
                    })}
                </Dialog>
                {showLoader && (
                    <div className="circularProgress">
                        <CircularProgress
                            color="inherit"
                            size={80}
                            thickness={3}
                        />
                    </div>
                )}
            </div>
        );
    }
}
