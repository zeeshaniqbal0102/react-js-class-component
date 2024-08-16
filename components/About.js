import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import ReactHtmlParser from "react-html-parser";

import axios from "axios";
import OurProcess from "./includes/OurProcess";
import Careers from "./includes/Careers";
import FAQ from "./includes/FAQ";
import ContactUs from "./includes/ContactUs";
import { API_URL } from "../store/actions/types";
import Fade from "react-reveal/Fade";
import { deviceType } from "react-device-detect";

class About extends Component {
  constructor() {
    super();
    this.state = {
      sub_page: "",
      page_title: "",
      tag_line: "",
      aboutLoading: true,
      headerImage: "",
      headerImageMobile: "",
      about: {},
      career: [],
      component: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    var sub_page = this.props.match.params.sub_page || "process";
    this.setState({ sub_page });
    axios(API_URL + "/about-us")
      .then((res) => {
        if (res.data.success === "true") {
          this.setState(
            {
              about: res.data.about,
              page_title: res.data.about.title,
              tag_line: res.data.about.tag_line,
              headerImage: res.data.about.bg_img,
              headerImageMobile: res.data.about.bg_img_mob,
              career: res.data.career,
              contact: res.data.contact,
              aboutLoading: false,
            },
            () => {
              this.changeTab(sub_page);
            }
          );
        } else {
          alert("Could not get contents");
          this.setState({
            aboutLoading: false,
          });
        }
      })
      .catch((err) => {
        alert("Something went wrong.");
        this.setState({
          aboutLoading: false,
        });
      });
  }

  changeTab = (tab) => {
    var component = null,
      page_title,
      tag_line;
    switch (tab) {
      case "careers":
        component = <Careers career={this.state.career} />;
        page_title = this.state.career[0].line_1;
        tag_line = this.state.career[0].line_2;
        break;
      case "faq":
        component = <FAQ />;
        page_title = "FAQ";
        tag_line = "Find the answers to our frequently asked questions here.";
        break;
      case "contact-us":
        component = <ContactUs contact={this.state.contact[0]} />;
        page_title = this.state.contact[0].line_1;
        tag_line = ReactHtmlParser(this.state.contact[0].line_2);
        break;
      case "process":
      default:
        component = <OurProcess about={this.state.about} />;
        page_title = this.state.about.title;
        tag_line = this.state.about.tag_line;
        break;
    }
    this.setState({ component, page_title, tag_line, sub_page: tab });
  };

  render() {
    const {
      sub_page,
      aboutLoading,
      headerImage,
      headerImageMobile,
      component,
      page_title,
      tag_line,
    } = this.state;

    return (
      <div className="about-page">
        <TopNav />
        {!aboutLoading ? (
          <Fade duration={1800}>
            <div className="prd-header">
              {deviceType === "mobile" ? (
                <img src={headerImageMobile} className="img-fluid" alt="" />
              ) : (
                <img src={headerImage} className="img-fluid" alt="" />
              )}

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="cat-heading">{page_title}</h4>
                    <span>{tag_line}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <ul className="tab-nav">
                      <li>
                        <Link
                          className={sub_page === "process" ? "active" : ""}
                          onClick={() => this.changeTab("process")}
                        >
                          Our Process
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={sub_page === "careers" ? "active" : ""}
                          onClick={() => this.changeTab("careers")}
                        >
                          Careers
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={sub_page === "faq" ? "active" : ""}
                          onClick={() => this.changeTab("faq")}
                        >
                          FAQ
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={sub_page === "contact-us" ? "active" : ""}
                          onClick={() => this.changeTab("contact-us")}
                        >
                          Contact Us
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                {component}
              </div>
            </div>
            <Footer redirectToTab={this.changeTab} />
          </Fade>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default About;
