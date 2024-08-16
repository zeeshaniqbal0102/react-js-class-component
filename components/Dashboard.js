import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import UserHeader from "./includes/UserHeader";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../store/actions/authActions";
import Fade from "react-reveal/Fade";

class Dashboard extends Component {
  logout = () => {
    this.props.logoutUser();
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="map-page">
        <TopNav />
        <Fade duration={1800}>
          <div className="udb-store">
            <div className="pb-5">
              <div className="udb-hd-bg">
                <div className="container-fluid nlrp">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-title">
                          <UserHeader />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row" />
              <div className="container">
                <div className="row">
                  <div className="udb-top-window">
                    <div className="col-lg-12 p-5">
                      {/* User DeshBoard Icon */}
                      <div className="udb-sc">
                        <div className="row">
                          <div className="col-md-3">
                            <Link to="/my-orders">
                              <div className="ubd-sc-cnt">
                                <img src="images/udb-icon-order.png" alt="" />
                                <p>Order History</p>
                              </div>
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <Link to="/my-profile">
                              <div className="ubd-sc-cnt">
                                <img src="images/udb-icon-edit.png" alt="" />
                                <p>Edit Profile</p>
                              </div>
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <Link to="/change-password">
                              <div className="ubd-sc-cnt">
                                <img src="images/udb-icon-edit.png" alt="" />
                                <p>Change Password</p>
                              </div>
                            </Link>
                          </div>
                          <div className="col-md-3">
                            <Link onClick={this.logout}>
                              <div className="ubd-sc-cnt">
                                <img src="images/udb-icon-lout.png" alt="" />
                                <p>Log Out</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* User DeshBoard Icon End */}
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
});
export default connect(mapStateToProps, { logoutUser })(withRouter(Dashboard));
