import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

class NotEligible extends Component {
  render() {
    return (
      <div className="container verify-age no-bg">
        <Fade duration={1800}>
          <Link to="/">
            <img src="images/SantaCruzLogo.png" className="img-fluid" alt="" />
          </Link>
          <div>
            <h2>You're not old enough to view this content.</h2>
          </div>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  age: state.age,
});
export default connect(mapStateToProps)(NotEligible);
