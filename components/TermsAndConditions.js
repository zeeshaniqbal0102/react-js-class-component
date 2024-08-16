import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import { API_URL } from "../store/actions/types";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class TermsAndConditions extends Component {
  constructor() {
    super();
    this.state = {
      contents: "",
      loading: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .get(API_URL + "/terms-and-conditions")
      .then((response) => {
        if (response.data.success === "true") {
          this.setState({
            contents: response.data.terms[0].text,
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    const { contents, loading } = this.state;
    const override = css`
      display: block;
      margin: 25px auto;
    `;
    return (
      <div>
        <TopNav />
        {!loading ? (
          <>
            <div className="main-container">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <Fade duration={1800}>
                      <h2>Terms &amp; Conditions</h2>
                      <p>{ReactHtmlParser(contents)}</p>
                    </Fade>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </>
        ) : (
          <ClipLoader
            css={override}
            size={25}
            color={"#3c3c3c"}
            loading={loading}
          />
        )}
      </div>
    );
  }
}

export default TermsAndConditions;
