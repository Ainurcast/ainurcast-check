import React, { Component } from "react";
import Login from "./login";
import Register from "./register";
import {
    CustomButton,
    CustomDialog as Dialog,
    CustomTextInput as TextInput,
    IconButton,
} from "../customComponents";
import constantData from "../../utils/constants";
import history from "../../utils/history";
import Media from "react-media";

const {
    passWordQualityCountMap,
    passwordTypeClassMap,
    passwordQualityStateMap,
} = constantData;

export default class Auth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showRegister: false,
            userCode: "",
            password: "",
            showPassword: false,
            showPasswordValidation: false,
            passwordQualityStates: {
                upperLower: false,
                number: false,
                specialCharacter: false,
            },
            openResetPasswordSuccessDialog: false,
        };
    }

    componentDidMount() {
        const {
            location: { search = "" },
        } = this.props;
        if (search) {
            if (!search.includes("user")) {
                this.props.verifyEmail(search);
            } else {
                this.setState({
                    userCode: search.split("=")[1],
                });
            }
        }
        if (localStorage.getItem("USER-CODE")) {
            history.push("/home");
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps?.location?.search !== this.props?.location?.search) {
            this.setState({
                userCode: "",
            });
        } else if (
            nextProps?.forgotPasswordSuccess !==
            this.props.forgotPasswordSuccess
        ) {
            this.setState({
                openResetPasswordSuccessDialog: true,
            });
        }
    }

    toggleShowRegister = () => {
        const { showRegister } = this.state;
        const { successRegister = false } = this.props;
        this.setState(
            {
                showRegister: !showRegister,
            },
            () => {
                if (this.state.showRegister && successRegister) {
                    this.props.registerSuccess();
                }
            }
        );
    };

    toggleVisibilityIcon = (type) => {
        this.setState({
            [type]: !this.state[type],
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    renderAuthForm = () => {
        const { showRegister } = this.state;
        return !showRegister ? (
            <Login
                toggleShowRegister={this.toggleShowRegister}
                {...this.props}
            />
        ) : (
            <Register
                toggleShowRegister={this.toggleShowRegister}
                {...this.props}
            />
        );
    };

    handleChangeInput = (e, value) => {
        const {
            target: { name },
        } = e;
        if (name === "password") {
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
            [name]: value,
        });
    };

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

    setNewPassword = () => {
        const { userCode, password } = this.state;
        this.props.setPassword({
            user_id: userCode,
            new_password: password,
            confirm_password: password,
        });
    };

    renderResetPassword = () => {
        const {
            password,
            showPassword,
            showPasswordValidation,
            passwordQualityStates,
        } = this.state;
        const pwdTypeCount = this.getPwdTypeCount();
        return (
            <div className="reset-password-container">
                <div className="reset-password-title">Set New Password</div>
                <div style={{ margin: "35px 0" }}>
                    <TextInput
                        label="Password"
                        name="password"
                        passwordField
                        type={showPassword ? "text" : "password"}
                        inputProps={
                            <IconButton
                                onClick={() =>
                                    this.toggleVisibilityIcon("showPassword")
                                }
                                onMouseDown={this.handleMouseDownPassword}
                            >
                                {showPassword ? (
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
                        onFocus={() =>
                            this.setState({
                                showPasswordValidation: true,
                            })
                        }
                        onBlur={() =>
                            this.setState({
                                showPasswordValidation: false,
                            })
                        }
                        value={password}
                        onChange={(e, value) =>
                            this.handleChangeInput(e, value)
                        }
                    />
                    {showPasswordValidation && (
                        <div className="password-quality-chks">
                            <div className="pwd-quality">
                                {passwordQualityStateMap.map((field, i) => {
                                    return (
                                        <div className="pwd-quality-wrapper">
                                            <div className="icon">
                                                <img
                                                    width={14}
                                                    height={14}
                                                    src={
                                                        passwordQualityStates[
                                                            field.state
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
                                })}
                            </div>
                            {password.length > 0 && (
                                <div
                                    className={`pwd-type ${passwordTypeClassMap[pwdTypeCount]}`}
                                >
                                    {passWordQualityCountMap[pwdTypeCount]}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <CustomButton
                    key={0}
                    label="Save New Password"
                    primary
                    customButtonStyle={{ width: "100%" }}
                    onClick={this.setNewPassword}
                    onMouseDown={this.handleMouseDownPassword}
                />
            </div>
        );
    };

    onEmailSuccessActionClick = () => {
        this.setState({
            openResetPasswordSuccessDialog: false,
        });
    };

    getBodyStyle = () => {
        if (window.matchMedia("(max-width: 767px)").matches) {
            return {
                padding: "0 16px 16px",
            };
        }
        return {
            padding: "0 40px 10px 40px"
        }
    };

    render() {
        const { forgotPasswordSuccess } = this.props;
        const { userCode, openResetPasswordSuccessDialog } = this.state;
        return (
            <div className="auth-container">
                <Media query="(max-width: 1024px)">
                    {(matches) =>
                        matches ? (
                            <div className="mobile-logo">
                                <img src="/assets/login-logo.svg" alt="logo" />
                            </div>
                        ) : (
                            <div className="ainurcast-auth-img">
                                <div className="auth-image-bg"></div>
                            </div>
                        )
                    }
                </Media>
                <div
                    className="render-auth-form"
                    style={{
                        alignItems: userCode ? "normal" : "center",
                        marginTop: userCode && "100px",
                    }}
                >
                    {userCode
                        ? this.renderResetPassword()
                        : this.renderAuthForm()}
                </div>
                <Dialog
                    open={openResetPasswordSuccessDialog}
                    title={"Email for Password Reset"}
                    bodyStyle={this.getBodyStyle()}
                    mobileDialog
                    actions={[
                        <CustomButton
                            key={0}
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
                            onClick={this.onEmailSuccessActionClick}
                        />,
                    ]}
                >
                    <div className="email-success-content">
                        We have sent a password reset link to your email id :{" "}
                        <span className="user-name">
                            {forgotPasswordSuccess}
                        </span>{" "}
                        . Please click on the link to reset your account
                        password.
                    </div>
                </Dialog>
            </div>
        );
    }
}
