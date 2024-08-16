import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../store/actions/authActions";

import { Link } from "react-router-dom";
import TextField from "./includes/TextField";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      disabled: false,
      first_ame: "",
      last_name: "",
      contact_number: "",
      email: "",
      password: "",
      password_confirmation: "",
      errors: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  startStopLoading = (v) => {
    this.setState({ loading: v, disabled: v });
  };
  submitReg = (e) => {
    e.preventDefault();
    const newUser = {
      user_type: "2",
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      contact_number: this.state.contact_number,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    this.props.registerUser(newUser, this.props.history, this.startStopLoading);
  };

  render() {
    const {
      disabled,
      errors,
      first_name,
      last_name,
      contact_number,
      email,
      password,
      password_confirmation,
    } = this.state;
    // const override = css`
    //   display: block;
    //   margin: 25px auto;
    // `;

    const { setting } = this.props;

    return setting.showLogin ? (
      <Fade duration={1800}>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">
              <div className="cross-det">
                {" "}
                <Link to="/">x</Link>
              </div>
              <form
                onSubmit={this.submitReg}
                className="login100-form validate-form"
              >
                <div className="login-pg-logo">
                  <Link to="/">
                    <img
                      src="/images/SantaCruzLogo.png"
                      className="img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <span className="login100-form-title p-b-34">
                  Create an Account
                </span>
                <TextField
                  placeholder="First Name"
                  name="first_name"
                  value={first_name}
                  onChange={this.onChange}
                  error={errors.first_name}
                />
                <TextField
                  placeholder="Last Name"
                  name="last_name"
                  value={last_name}
                  onChange={this.onChange}
                  error={errors.last_name}
                />
                <TextField
                  placeholder="Contact Number"
                  name="contact_number"
                  value={contact_number}
                  onChange={this.onChange}
                  error={errors.contact_number}
                />
                <TextField
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextField
                  type="password"
                  placeholder="Confirm Password"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={this.onChange}
                  error={errors.password_confirmation}
                />
                <div className="container-login100-form-btn">
                  <button className="login100-form-btn" disabled={disabled}>
                    Sign up
                  </button>
                </div>
                {/* <div className="w-full text-center p-t-27 p-b-25">
                  <ClipLoader
                    css={override}
                    size={25}
                    color={"#3c3c3c"}
                    loading={loading}
                  />
                </div> */}

                <div className="w-full text-center p-t-27 p-b-25"></div>
                <div className="w-full text-center">
                  <p>Already have an account? Login below</p>
                  <Link to="/login" className="txt3">
                    Sign In
                  </Link>
                </div>
              </form>
              <div
                className="login100-more"
                style={{ backgroundImage: 'url("images/login-bg.png")' }}
              />
            </div>
          </div>
        </div>
      </Fade>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.error,
  setting: state.setting,
});

const mapDispatchToProps = { registerUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Register));
