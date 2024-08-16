import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { eligible } from "../store/actions/ageActions";
import { setStateId } from "../store/actions/stateActions";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { API_URL } from "../store/actions/types";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import ReactHtmlParser from "react-html-parser";

class VerifyAge extends Component {
  constructor() {
    super();
    this.state = {
      ageCheck: "",
      states: [],
      bgImage: "",
      text: "",
      not21: "",
      loading: true,
    };
  }

  componentDidMount() {
    axios(`${API_URL}/landing-page`)
      .then((response) => {
        if (response.data.success) {
          this.setState({
            states: response.data.states,
            bgImage: response.data.landing_page.image,
            text: response.data.landing_page.text,
            not21: response.data.landing_page.not_over_21_text,
            loading: false,
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        this.setState({
          loading: false,
        });
        alert("Something went wrong.");
      });
  }

  handleRadioChange = (e) => {
    const { value } = e.target;
    this.props.eligible(value === "yes", this.props.history);
    this.setState({
      ageCheck: value,
    });
  };

  selectState = (stateId, stateName) => {
    this.props.setStateId(stateId, stateName);
    this.props.history.push("/");
  };

  render() {
    const { ageCheck, loading, states, text, not21, bgImage } = this.state;
    const override = css`
      display: block;
      margin: 0 auto;
    `;
    var msg;
    if (ageCheck === "no") {
      msg = (
        <span className="not-eligible">
          {ReactHtmlParser(not21.replace("\n", "<br />"))}
        </span>
      );
    } else if (ageCheck === "yes") {
      msg = ""; //<span className="eligible">Select your state.</span>;
    }
    return (
      <>
        <nav className="nav-landing">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a className="navbar-brand" href="/">
                  <img
                    src="/images/SantaCruzLogo.png"
                    className="img-fluid logo-landing"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div
          className="verify-age"
          style={{ backgroundImage: `url("${bgImage}")` }}
        >
          <Fade duration={1800}>
            <div className="content">
              <div>
                <h2 className="landing-heding">
                  {ReactHtmlParser(text.replace("\n", "<br />"))}
                </h2>
              </div>
              {loading ? (
                <ClipLoader
                  css={override}
                  size={25}
                  color={"#3c3c3c"}
                  loading={loading}
                />
              ) : (
                <>
                  <p className="age-verification">
                    <label>
                      <input
                        type="radio"
                        value="yes"
                        onChange={this.handleRadioChange}
                        checked={ageCheck === "yes"}
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="no"
                        onChange={this.handleRadioChange}
                        checked={ageCheck === "no"}
                      />
                      No
                    </label>
                    {/* <Link
              className="btn-verify-age-no"
              onClick={() => {
                this.ageVerify(false, this.props.history);
                // window.location.href = "about:blank";
              }}
            >
              No
            </Link>
            <Link
              className="btn-verify-age-yes"
              onClick={() => {
                this.ageVerify(true, this.props.history);
              }}
            >
              Yes
            </Link> */}
                  </p>
                  <p>{msg}</p>
                  <div
                    className="age-verification col-md-12 nlrp"
                    style={{
                      display: ageCheck === "yes" ? "block" : "none",
                      flex: "unset",
                    }}
                  >
                    <div className="pro-det-btn2">
                      <div className="pro-dt-in">
                        <div className="select-box">
                          <div className="select-box__current" tabIndex={1}>
                            <div className="select-box__value">
                              <input
                                className="select-box__input"
                                type="radio"
                                id={0}
                                defaultValue={1}
                                name="Ben"
                                defaultChecked="checked"
                              />

                              <p className="select-box__input-text">
                                Select your state
                              </p>
                            </div>
                            <img
                              className="select-box__icon"
                              src="images/img_295694.svg"
                              alt="Arrow Icon"
                              aria-hidden="true"
                            />
                          </div>
                          <ul className="select-box__list states">
                            {states.map((state, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  this.selectState(state.id, state.state_code);
                                }}
                              >
                                <label className="select-box__option">
                                  {state.state_name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Fade>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  age: state.age,
});
export default connect(mapStateToProps, { eligible, setStateId })(
  withRouter(VerifyAge)
);
