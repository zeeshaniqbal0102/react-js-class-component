import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import TextField from "./includes/TextField";
// import { css } from "@emotion/core";
// import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(
      user,
      this.props.history,
      this.startStopLoading,
      this.props.redirectTo
    );
  };
  render() {
    const { errors, email, password, loading } = this.state;
    const { setting } = this.props;
    // const override = css`
    //   display: block;
    //   margin: 25px auto;
    // `;

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
                onSubmit={this.onFormSubmit}
                className="login100-form validate-form"
              >
                <div className="login-pg-logo">
                  <Link to="/">
                    <img
                      src="images/SantaCruzLogo.png"
                      className="img-fluid"
                      alt=""
                    />
                  </Link>
                </div>
                <span className="login100-form-title p-b-34">
                  Account Login
                </span>
                <TextField
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  error={errors.email}
                  onChange={this.handleChange}
                />
                <TextField
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  error={errors.password}
                  onChange={this.handleChange}
                />
                {errors.auth ? (
                  <div className="container-login100-form-btn m-b-20">
                    <div class="alert alert-danger" role="alert">
                      {errors.auth}
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="container-login100-form-btn">
                  <button
                    type="submit"
                    disabled={loading}
                    className="login100-form-btn"
                  >
                    Sign in
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
                <div className="w-full text-center p-b-10">
                  <Link to="/forgot-password" className="txt2">
                    Forgot password?
                  </Link>
                </div>
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
  redirectTo: state.redirectTo,
  setting: state.setting,
});
const mapDispatchToProps = { loginUser };
export default connect(mapStateToProps, mapDispatchToProps)(Login);
