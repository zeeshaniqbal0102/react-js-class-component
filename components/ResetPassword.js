import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../store/actions/authActions";
import TextField from "./includes/TextField";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";
import { API_URL } from "../store/actions/types";
import axios from "axios";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      reset_code: "",
      email: "",
      new_password: "",
      confirm_password: "",
      errors: {},
      codeLoading: false,
      loading: false,
      disabled: false,
    };
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidMount() {
    const resetCode = this.props.match.params.reset_code;
    this.setState({ codeLoading: true });
    axios
      .post(`${API_URL}/reset-password/${resetCode}`)
      .then((response) => {
        this.setState({ codeLoading: false });
        if (response.data.success === "true") {
          this.setState({
            email: response.data.email,
            reset_code: resetCode,
          });
        } else {
          this.setState({ errors: { no_user: true } });
        }
      })
      .catch((e) => {
        this.setState({ codeLoading: false });
        alert("Something went wrong");
      });
  }
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
  clearFields = () => {
    this.setState({ new_password: "", confirm_password: "" });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      reset_code: this.state.reset_code,
      email: this.state.email,
      new_password: this.state.new_password,
      confirm_password: this.state.confirm_password,
    };
    this.props.resetPassword(data, this.startStopLoading, this.clearFields);
  };
  render() {
    const {
      errors,
      email,
      new_password,
      confirm_password,
      loading,
      codeLoading,
      disabled,
    } = this.state;
    const override = css`
      display: block;
      margin: 25px auto;
    `;
    return (
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
                  Reset Password
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
                {errors.no_user ? (
                  <div
                    class="alert alert-danger"
                    style={{ margin: "0px auto 20px" }}
                    role="alert"
                  >
                    Invalid reset code or reset code has expired.
                  </div>
                ) : !codeLoading ? (
                  <>
                    <div className="fp-email">
                      <input type="hidden" name="email" value={email} />
                    </div>
                    <div className="fp-email">
                      <TextField
                        type="password"
                        placeholder="Enter new password"
                        name="new_password"
                        value={new_password}
                        error={errors.new_password}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="fp-email">
                      <TextField
                        type="password"
                        placeholder="Confirm new password"
                        name="confirm_password"
                        value={confirm_password}
                        error={errors.confirm_password}
                        onChange={this.handleChange}
                      />
                    </div>
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
                        disabled={disabled}
                        className="login100-form-btn"
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="w-full text-center p-t-15">
                      <ClipLoader
                        css={override}
                        size={25}
                        color={"#3c3c3c"}
                        loading={loading || codeLoading}
                      />
                    </div>
                    <div className="w-full text-center">
                      <p>Dont have an account? Register below</p>
                      <Link to="/register" className="txt3">
                        Sign Up
                      </Link>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </form>
              <div
                className="login100-more"
                style={{ backgroundImage: 'url("/images/login-bg.png")' }}
              />
            </div>
          </div>
        </div>
      </Fade>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.error,
});
const mapDispatchToProps = { resetPassword };
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
