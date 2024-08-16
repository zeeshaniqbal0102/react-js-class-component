import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { forgotPassword } from "../store/actions/authActions";
import TextField from "./includes/TextField";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {},
      loading: false,
      disabled: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  startStopLoading = (v) => {
    this.setState({ loading: v, disabled: v });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.state.email,
    };
    this.props.forgotPassword(data, this.props.history, this.startStopLoading);
  };
  render() {
    const { errors, email, disabled } = this.state;
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
                <Link to="/">x</Link>
              </div>
              <form
                onSubmit={this.onFormSubmit}
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
                  Forgot Password
                </span>
                {errors.success_message ? (
                  <div
                    class="alert alert-success"
                    style={{ margin: "0px auto 20px" }}
                    role="alert"
                  >
                    {errors.success_message}
                  </div>
                ) : (
                  ""
                )}
                <div className="fp-email">
                  <TextField
                    placeholder="Email Address"
                    name="email"
                    value={email}
                    error={errors.email}
                    onChange={this.handleChange}
                  />
                </div>
                {errors.auth ? (
                  <div className="container-login100-form-btn m-b-20">
                    <div
                      class="alert alert-danger"
                      style={{ margin: "0px auto 20px" }}
                      role="alert"
                    >
                      {errors.auth}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="container-login100-form-btn">
                  <button
                    type="submit"
                    disabled={disabled}
                    className="login100-form-btn"
                  >
                    Reset Password
                  </button>
                </div>
                {/* <div className="w-full text-center p-t-15">
                  <ClipLoader
                    css={override}
                    size={25}
                    color={"#3c3c3c"}
                    loading={loading}
                  />
                </div> */}
                <div className="w-full text-center">
                  <p>Dont have an account? Register below</p>
                  <Link to="/register" className="txt3">
                    Sign Up
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
  errors: state.errors.error,
  setting: state.setting,
});
const mapDispatchToProps = { forgotPassword };
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
