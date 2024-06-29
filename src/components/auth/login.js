import React, { PureComponent } from "react";
import {
  CustomButton,
  CustomTextInput as TextInput,
  IconButton,
} from "../customComponents";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showEmailError: false,
      showPasswordError: false,
      emailErrorMsg: "",
      passwordErrorMsg: "",
      showPassword: false,
    };
  }

  handleChangeInput = (e, value) => {
    const { showEmailError, showPasswordError } = this.state;
    const {
      target: { name },
    } = e;
    if (name === "email" && showEmailError) {
      this.setState({
        showEmailError: false,
        emailErrorMsg: "",
      });
    } else if (name === "password" && showPasswordError) {
      this.setState({
        showPasswordError: false,
        passwordErrorMsg: "",
      });
    }
    this.setState({
      [name]: value,
    });
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      this.handleLogin();
    }
  };

  handleLogin = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email, password } = this.state;
    if (!email && !password) {
      this.setState({
        showEmailError: true,
        showPasswordError: true,
        emailErrorMsg: "Please enter Email ID!",
        passwordErrorMsg: "Please enter the password!",
      });
    } else if (!email || !emailRegex.test(email)) {
      this.setState({
        showEmailError: true,
        emailErrorMsg: "Please enter Valid Email ID!",
      });
    } else if (!password || password.length < 6) {
      this.setState({
        showPasswordError: true,
        passwordErrorMsg: "Please enter the password!",
      });
    } else {
      console.log("doLogin",email,password)
      this.props.doLogin({ email, password });
    }
  };

  handleForgotPassword = () => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const { email } = this.state;
    if (!email) {
      this.setState({
        showEmailError: true,
        emailErrorMsg: "Please enter Email ID!",
      });
    } else if (!email || !emailRegex.test(email)) {
      this.setState({
        showEmailError: true,
        emailErrorMsg: "Please enter Valid Email ID!",
      });
    } else {
      this.props.resetPassword({ email });
    }
  };
  render() {
    const {
      email,
      password,
      showPassword,
      showEmailError,
      emailErrorMsg,
      showPasswordError,
      passwordErrorMsg,
    } = this.state;
    const { toggleShowRegister, showLoader = false } = this.props;
    return (
      <div className="login-container">
        <div className="login-hd">
          <span className="signin-hd">Sign In</span>
          <CustomButton
            onClick={toggleShowRegister}
            label="Create New Account"
          />
        </div>
        <div className="login-form-element">
          <TextInput
            label="Email"
            name="email"
            placeholder="e.g. johndoe@gmail.com"
            value={email}
            error={showEmailError}
            helperText={emailErrorMsg}
            onKeyDown={this.handleKeypress}
            onChange={(e, value) => this.handleChangeInput(e, value)}
          />
        </div>

        <div className="login-form-element">
          <TextInput
            label="Password"
            name="password"
            passwordField
            type={showPassword ? "text" : "password"}
            error={showPasswordError}
            helperText={passwordErrorMsg}
            onKeyDown={this.handleKeypress}
            inputProps={
              <IconButton
                onClick={this.handleClickShowPassword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {showPassword ? (
                  <img src="/assets/eye-close.svg" className="visibility" />
                ) : (
                  <img src="/assets/eye-open.svg" className="visibility" />
                )}
              </IconButton>
            }
            value={password}
            onChange={(e, value) => this.handleChangeInput(e, value)}
          />
          <div className="forgot-password">
            <CustomButton
              label="Forgot Password?"
              onClick={this.handleForgotPassword}
            />
          </div>
          <CustomButton
            primary
            label="Sign In"
            onClick={this.handleLogin}
            onKeyPress={this.handleKeypress}
          />
          {/* <div className="social-sign-up">
                        <CustomButton secondary label="Sign In with Google" />
                    </div> */}
        </div>
        {showLoader && (
          <div className="circularProgress">
            <CircularProgress color="inherit" size={80} thickness={3} />
          </div>
        )}
      </div>
    );
  }
}
