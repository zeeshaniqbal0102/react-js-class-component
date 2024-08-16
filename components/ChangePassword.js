import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import UserHeader from "./includes/UserHeader";
import UserSidebar from "./includes/UserSidebar";
import TextFieldGroup from "./includes/TextFieldGroup";
import { connect } from "react-redux";
import { changePassword } from "../store/actions/authActions";
import Fade from "react-reveal/Fade";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      current_password: "",
      new_password: "",
      confirm_password: "",
      errors: {},
    };
  }
  componentWillReceiveProps(nextProps) {
    window.scrollTo(0, 0);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
      console.log(nextProps.errors);
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  clearFields = () => {
    this.setState({
      current_password: "",
      new_password: "",
      confirm_password: "",
    });
  };
  startStopLoading = (loading) => {
    this.setState({ loading });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const updatedPassword = {
      current_password: this.state.current_password,
      new_password: this.state.new_password,
      confirm_password: this.state.confirm_password,
    };

    this.props.changePassword(
      updatedPassword,
      this.clearFields,
      this.startStopLoading
    );
  };

  render() {
    const {
      loading,
      errors,
      new_password,
      confirm_password,
      current_password,
    } = this.state;
    const override = css`
      display: block;
      margin-right: 25px;
      margin-top: 10px;
    `;
    return (
      <div className="udb-page usr-page">
        <TopNav />
        <Fade duration={1800}>
          <div className="udb">
            <div className="pb-5">
              <div className="udb-head-inner">
                <UserHeader />
              </div>
              <div className="row" />
              <div className="container">
                <div className="row">
                  <div className="udb-top-window">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="udb-right">
                          <UserSidebar />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="udb-left">
                          <div className="olist">
                            <h2>Change Password</h2>
                          </div>
                          <div className="row flex-lg-nowrap">
                            <div className="col-md-12">
                              <div className="row">
                                <div className="col-md-12 mb-3">
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="e-profile">
                                        <div className="tab-content pt-3">
                                          <div className="tab-pane active">
                                            <form
                                              onSubmit={this.onFormSubmit}
                                              className="form"
                                              noValidate
                                            >
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="row cpassword-box">
                                                    <div className="col-md-12 mb-3">
                                                      <div className="row">
                                                        <div className="col-md-12">
                                                          <label>
                                                            Current Password
                                                          </label>
                                                          <TextFieldGroup
                                                            type="password"
                                                            name="current_password"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={
                                                              current_password
                                                            }
                                                            error={
                                                              errors.current_password
                                                            }
                                                            onChange={
                                                              this.handleChange
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col-md-6">
                                                          {" "}
                                                          <label>
                                                            New Password
                                                          </label>
                                                          <TextFieldGroup
                                                            type="password"
                                                            name="new_password"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={new_password}
                                                            error={
                                                              errors.new_password
                                                            }
                                                            onChange={
                                                              this.handleChange
                                                            }
                                                          />
                                                        </div>
                                                        <div className="col-md-6">
                                                          {" "}
                                                          <label>
                                                            Confirm Password
                                                          </label>
                                                          <TextFieldGroup
                                                            type="password"
                                                            name="confirm_password"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={
                                                              confirm_password
                                                            }
                                                            error={
                                                              errors.confirm_password
                                                            }
                                                            onChange={
                                                              this.handleChange
                                                            }
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="row cpassword-box">
                                                    <div className="col-md-12">
                                                      {errors.message ? (
                                                        <div
                                                          className="alert alert-success"
                                                          role="alert"
                                                        >
                                                          {errors.message}
                                                        </div>
                                                      ) : (
                                                        ""
                                                      )}
                                                      <div className="row">
                                                        <div className="col d-flex justify-content-end">
                                                          <div className="sweet-loading">
                                                            <ClipLoader
                                                              css={override}
                                                              size={25}
                                                              color={"#3c3c3c"}
                                                              loading={loading}
                                                            />
                                                          </div>
                                                          <button
                                                            className="btn btn-primary"
                                                            type="submit"
                                                          >
                                                            Change Password
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  errors: state.errors.error,
});

export default connect(mapStateToProps, { changePassword })(ChangePassword);
