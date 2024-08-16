import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import UserHeader from "./includes/UserHeader";
import UserSidebar from "./includes/UserSidebar";
import { connect } from "react-redux";
import { updateUser } from "../store/actions/authActions";
import TextFieldGroup from "./includes/TextFieldGroup";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class MyProfile extends Component {
  constructor() {
    super();
    this.state = {
      avatar: null,
      profilePicture: "",
      first_name: "",
      last_name: "",
      email: "",
      contact_number: "",
      errors: {},
      loading: false,
      disabled: false,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    const { user } = this.props.auth;
    this.setState({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      contact_number: user.contact_number,
      profilePicture: this.props.auth.user.avatar,
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleAvatar = (e) => {
    window.$("#avatar").trigger("click");
  };
  onAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      this.setState({
        profilePicture: URL.createObjectURL(e.target.files[0]),
      });
    }
    this.setState({
      avatar: e.target.files[0],
    });
  };
  onFormSubmit = (e) => {
    e.preventDefault();
    const userProfile = new FormData();
    userProfile.append("first_name", this.state.first_name);
    userProfile.append("last_name", this.state.last_name);
    userProfile.append("email", this.state.email);
    userProfile.append("contact_number", this.state.contact_number);
    userProfile.append("avatar", this.state.avatar);
    this.props.updateUser(userProfile, this.startStopLoading);
  };
  render() {
    const { auth } = this.props;
    const {
      errors,
      first_name,
      last_name,
      email,
      contact_number,
      profilePicture,
      loading,
      disabled,
    } = this.state;

    const override = css`
      display: block;
      margin: 10px auto 0;
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
                            <h2>Edit Profile</h2>
                          </div>
                          <div className="row flex-lg-nowrap">
                            <div className="col">
                              <div className="row">
                                <div className="col mb-3">
                                  <div className="card">
                                    <div className="card-body">
                                      <div className="e-profile">
                                        <div className="row">
                                          <div className="col-12 col-sm-auto mb-3">
                                            <div
                                              className="mx-auto epro"
                                              style={{ width: "140px" }}
                                            >
                                              <img
                                                src={profilePicture}
                                                alt=""
                                              />
                                            </div>
                                          </div>
                                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">
                                                {auth.user.fullName}
                                              </h4>
                                              <div className="mt-2 eprofile-btn">
                                                <button
                                                  onClick={this.handleAvatar}
                                                  className="btn btn-primary"
                                                  type="button"
                                                >
                                                  {" "}
                                                  <i className="fa fa-fw fa-camera" />{" "}
                                                  <span>Change Photo</span>{" "}
                                                </button>
                                                <input
                                                  style={{ display: "none" }}
                                                  type="file"
                                                  id="avatar"
                                                  accept=".png, .jpg, .jpeg"
                                                  onChange={this.onAvatarChange}
                                                  ref={(ref) =>
                                                    (this.fileInput = ref)
                                                  }
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="tab-content pt-3">
                                          <div className="tab-pane active">
                                            {errors.message ? (
                                              <div className="alert alert-success">
                                                {errors.message}
                                              </div>
                                            ) : (
                                              ""
                                            )}
                                            <form
                                              onSubmit={this.onFormSubmit}
                                              className="form"
                                              noValidate
                                            >
                                              <div className="row">
                                                <div className="col-md-12">
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                      <div className="form-group">
                                                        <label>
                                                          First Name
                                                        </label>
                                                        <TextFieldGroup
                                                          type="text"
                                                          name="first_name"
                                                          className="form-control"
                                                          placeholder=""
                                                          value={first_name}
                                                          error={
                                                            errors.first_name
                                                          }
                                                          onChange={
                                                            this.handleChange
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <div className="form-group">
                                                        <label>Last Name</label>
                                                        <TextFieldGroup
                                                          type="text"
                                                          name="last_name"
                                                          className="form-control"
                                                          placeholder=""
                                                          value={last_name}
                                                          error={
                                                            errors.last_name
                                                          }
                                                          onChange={
                                                            this.handleChange
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md-6">
                                                      <div className="form-group">
                                                        <label>
                                                          Contact Number
                                                        </label>
                                                        <TextFieldGroup
                                                          type="text"
                                                          name="contact_number"
                                                          className="form-control"
                                                          placeholder=""
                                                          value={contact_number}
                                                          error={
                                                            errors.contact_number
                                                          }
                                                          onChange={
                                                            this.handleChange
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                      <div className="form-group">
                                                        <label>
                                                          Email Address
                                                        </label>
                                                        <TextFieldGroup
                                                          type="email"
                                                          name="email"
                                                          className="form-control"
                                                          placeholder=""
                                                          value={email}
                                                          error={errors.email}
                                                          onChange={
                                                            this.handleChange
                                                          }
                                                        />
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                              <div className="row epro-btn">
                                                <div className="col-md-12 d-flex justify-content-end">
                                                  <div
                                                    style={{
                                                      display: "flex",
                                                      alignItems: "center",
                                                      marginRight: "30px",
                                                    }}
                                                  >
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
                                                    disabled={disabled}
                                                  >
                                                    Save Changes
                                                  </button>
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
          <Footer />
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors.error,
});

export default connect(mapStateToProps, { updateUser })(MyProfile);
