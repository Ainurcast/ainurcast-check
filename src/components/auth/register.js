import React, { PureComponent } from "react";
import {
    CustomButton,
    CustomTextInput as TextInput,
    IconButton,
} from "../customComponents";
import constantData from "../../utils/constants";
import { isMobile } from "react-device-detect";

const {
    passWordQualityCountMap,
    passwordTypeClassMap,
    passwordQualityStateMap,
} = constantData;

export default class Register extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            showPassword: false,
            formValidations: {
                firstName: this.getFormValidationValues(),
                lastName: this.getFormValidationValues(),
                email: this.getFormValidationValues(),
                password: this.getFormValidationValues(),
            },
            passwordQualityStates: {
                upperLower: false,
                number: false,
                specialCharacter: false,
            },
            showPasswordValidation: false,
        };
    }

    getFormValidationValues = () => {
        return {
            error: false,
            msg: "",
        };
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

    handleChangeInput = (e, value) => {
        const {
            target: { name },
        } = e;
        const { formValidations } = this.state;
        if (name && formValidations[name].error) {
            this.setValidationErrorState(false, "", name);
        }
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

    toggleVisibilityIcon = (type) => {
        this.setState({
            [type]: !this.state[type],
        });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    mapStateToName = () => {
        return {
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            password: "Password",
        };
    };

    handleSignup = () => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {
            email,
            password,
            firstName,
            lastName,
            formValidations,
        } = this.state;

        let isFormValid = true;
        for (const fieldName of Object.keys(formValidations)) {
            if (!this.state[fieldName]) {
                isFormValid = false;
                this.setValidationErrorState(
                    true,
                    `Please enter ${this.mapStateToName()[fieldName]}!`,
                    fieldName
                );
            }
            if (fieldName === "email" && email && !emailRegex.test(email)) {
                isFormValid = false;
                this.setValidationErrorState(
                    true,
                    `Please enter valid Email ID!`,
                    fieldName
                );
            }
        }
        if (isFormValid) {
            const registerUserData = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                confirm_password: password,
            };
            this.props.registerUser(registerUserData);
        }
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

    getCardContent = () => {
        const { registerData: { email = "" } = {} } = this.props;
        return (
          <div className="card-content">
            <div className="email-verification">
              <div className="email-verify-hd">Email Verification</div>
              <div className="email-verify-desc">
                We have sent a verification link to your email id:&nbsp;
                <span className="user-name">{email}</span> Please click on the
                link to verify email and sign in.
              </div>
              <div className="resend-email-wrapper">
                <div className="din-find-email">Didn’t find the email ?</div>
                <CustomButton
                  label="Resend Email"
                  onClick={() =>
                    this.props.resendEmail({
                      email: email,
                    })
                  }
                />
              </div>
            </div>
          </div>
        );
    };

    render() {
        const {
            email,
            password,
            firstName,
            lastName,
            showPassword,
            formValidations,
            passwordQualityStates,
            showPasswordValidation,
        } = this.state;
        const { toggleShowRegister, successRegister, showLoader } = this.props;
        const pwdTypeCount = this.getPwdTypeCount();
        return (
            <div className="register-container">
                {!successRegister && !showLoader && (
                    <>
                        <div className="register-hd">
                            <span className="signup-hd">Sign up</span>
                            <CustomButton
                                onClick={toggleShowRegister}
                                label="I Have an Account"
                            />
                        </div>
                        <div className="register-form-element">
                            <TextInput
                                label="First Name"
                                name="firstName"
                                autoComplete="off"
                                placeholder="e.g. johndoe"
                                value={firstName}
                                error={formValidations.firstName["error"]}
                                helperText={formValidations.firstName["msg"]}
                                onChange={(e, value) =>
                                    this.handleChangeInput(e, value)
                                }
                            />
                        </div>
                        <div className="register-form-element">
                            <TextInput
                                label="Last Name"
                                name="lastName"
                                autoComplete="off"
                                placeholder="e.g. johndoe"
                                value={lastName}
                                error={formValidations.lastName["error"]}
                                helperText={formValidations.lastName["msg"]}
                                onChange={(e, value) =>
                                    this.handleChangeInput(e, value)
                                }
                            />
                        </div>

                        <div className="register-form-element">
                            <TextInput
                                label="Email"
                                name="email"
                                placeholder="e.g. johndoe@gmail.com"
                                value={email}
                                error={formValidations.email["error"]}
                                helperText={formValidations.email["msg"]}
                                onChange={(e, value) =>
                                    this.handleChangeInput(e, value)
                                }
                            />
                        </div>
                        <div className="register-form-element">
                            <TextInput
                                label="Password"
                                name="password"
                                passwordField
                                type={showPassword ? "text" : "password"}
                                error={formValidations.password["error"]}
                                helperText={formValidations.password["msg"]}
                                inputProps={
                                    <IconButton
                                        onClick={() =>
                                            this.toggleVisibilityIcon(
                                                "showPassword"
                                            )
                                        }
                                        onMouseDown={
                                            this.handleMouseDownPassword
                                        }
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
                                onBlur={() =>
                                    this.setState({
                                        showPasswordValidation: false,
                                    })
                                }
                                onFocus={() =>
                                    this.setState({
                                        showPasswordValidation: true,
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
                                        {passwordQualityStateMap.map(
                                            (field, i) => {
                                                return (
                                                    <div className="pwd-quality-wrapper">
                                                        <div className="icon">
                                                            <img
                                                                width={14}
                                                                height={14}
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
                                    {
                                        password.length > 0 && 
                                        <div
                                        className={`pwd-type ${passwordTypeClassMap[pwdTypeCount]}`}
                                    >
                                        {passWordQualityCountMap[pwdTypeCount]}
                                    </div>
                                    }
                                </div>
                            )}
                        </div>
                        <CustomButton
                            primary
                            label="Sign Up"
                            onClick={this.handleSignup}
                            onMouseDown={this.handleMouseDownPassword}
                        />
                    </>
                )}

                {successRegister && (
                    <>
                        <div className="card">{this.getCardContent()}</div>
                        <div className="other-signins-divider">
                            <div className="dash"></div>
                            <div className="or">OR</div>
                            <div className="dash"></div>
                        </div>
                        <div className="signup-again">
                            <CustomButton
                                primary
                                label="Try Signing up Again"
                                onClick={() => this.props?.registerSuccess({})}
                            />
                        </div>
                    </>
                )}
                {!successRegister && showLoader && (
                    <div className="setting-card">
                        <div className="setting-text">SETTING YOU UP… {isMobile && <br></br> } WAIT</div>
                    </div>
                )}
                {/* <div className="social-sign-up">
                    <CustomButton secondary label="Sign In with Google" />
                </div> */}
            </div>
        );
    }
}
