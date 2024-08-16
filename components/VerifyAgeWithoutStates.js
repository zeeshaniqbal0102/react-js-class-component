import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { eligible } from "../store/actions/ageActions";
import Fade from "react-reveal/Fade";

class VerifyAge extends Component {
  render() {
    return (
      <div className="verify-age">
        <Fade duration={1800}>
          <div className="content">
            <img src="images/SantaCruzLogo.png" className="img-fluid" />
            <div>
              <h2>Are you over 21 years of age?</h2>
            </div>
            <p className="age-verification">
              <Link
                className="btn-verify-age-no"
                onClick={() => {
                  this.props.eligible(false, this.props.history);
                  // window.location.href = "about:blank";
                }}
              >
                No
              </Link>
              <Link
                className="btn-verify-age-yes"
                onClick={() => {
                  this.props.eligible(true, this.props.history);
                }}
              >
                Yes
              </Link>
            </p>
          </div>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  age: state.age,
});
export default connect(mapStateToProps, { eligible })(withRouter(VerifyAge));
