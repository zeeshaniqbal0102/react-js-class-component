import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import axios from "axios";
import { API_URL } from "../store/actions/types";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";
import ReactHtmlParser from "react-html-parser";
// import OwlCarousel from "react-owl-carousel";
// import Anchor from "./includes/Anchor";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

class Vapes extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      loading: true,
      tab: "",
      content: {},
      contentLoading: true,
      header_img: "",
      tech_header_img: "",
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    window.jQuery(function ($) {
      $(document).on("click", "a.main-tab", function (e) {
        e.preventDefault();
        $(".aboutus-page.page").css({
          backgroundImage: "url('" + $(this).attr("header_img") + "')",
        });
      });
    });
    await this.setState({ tab: this.props.match.params.tab || "technology" });
    axios
      .post(`${API_URL}/all-product/vape-pens`)
      .then((response) => {
        if (response.data.success === "true") {
          this.setState({
            categories: response.data.sub_categories,
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });

    axios(`${API_URL}/technology`)
      .then((response) => {
        if (response.data.success === "true") {
          this.setState({
            content: response.data.technology,
            header_img: response.data.technology.header_img,
            tech_header_img: response.data.technology.header_img,
            contentLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const {
      tab,
      categories,
      loading,
      content,
      contentLoading,
      header_img,
      tech_header_img,
    } = this.state;
    const override = css`
      display: block;
      margin: 100px auto;
    `;
    // const responsive = {
    //   0: {
    //     items: 1,
    //   },
    //   450: {
    //     items: 1,
    //   },
    //   600: {
    //     items: 1,
    //   },
    //   1000: {
    //     items: 1,
    //   },
    // };
    return (
      <div
        className="aboutus-page page"
        style={{ backgroundImage: `url('${header_img}')` }}
        //  style={{ backgroundColor: "black" }}
      >
        <TopNav />
        <div className="vapesec main-container vape-container">
          <div className="sweet-loading">
            <ClipLoader
              css={override}
              size={25}
              color={"#3c3c3c"}
              loading={loading}
            />
          </div>
          {!loading && (
            <Fade duration={1800}>
              <div>
                <div className="container mt15 v-tabs">
                  <div className="row">
                    <div className="col-lg-12">
                      <nav>
                        <div
                          className="nav nav-tabs nav-fill"
                          id="nav-tab"
                          role="tablist"
                        >
                          <button
                            className={`main-tab nav-item nav-link${
                              tab === "technology" ? " active show" : ""
                            }`}
                            id="nav-oprocess-tab"
                            data-toggle="tab"
                            href="#tab-technology"
                            role="tab"
                            aria-controls="tab-technology"
                            aria-selected="true"
                            header_img={tech_header_img}
                          >
                            All
                          </button>
                          {categories.map((category) => (
                            <button
                              className={`main-tab nav-item nav-link${
                                this.state.tab === category.slug
                                  ? " active show"
                                  : ""
                              }`}
                              data-toggle="tab"
                              href={`#tab-${category.slug}`}
                              role="tab"
                              aria-controls={`tab-${category.slug}`}
                              aria-selected="false"
                              header_img={category.header_img}
                            >
                              {category.category_name}
                            </button>
                          ))}
                        </div>
                      </nav>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-12 nlrp">
                      <div className="tab-content" id="nav-tabContent">
                        {/*-- The Best Technology --*/}
                        <div
                          className={`tab-pane fade${
                            tab === "technology" ? " active show" : ""
                          }`}
                          id="tab-technology"
                          role="tabpanel"
                          aria-labelledby="nav-oprocess-tab"
                        >
                          {!contentLoading ? (
                            <>
                              <div
                                className="vape-tech-tp vape991"
                                /*style={{ backgroundColor: content.bg_color }}*/
                              >
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <h4>
                                        {content.line_1}
                                        <span>
                                          {ReactHtmlParser(content.line_2)}
                                        </span>
                                      </h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="vape-tech-video">
                                <Fade bottom duration={800}>
                                  <div className="vape-sat">
                                    <div className="container">
                                      <div className="row">
                                        {categories.map((category) => {
                                          {
                                            return category.product.map(
                                              (product, index) => {
                                                return (
                                                  <div
                                                    className="col-md-4 align-bottom"
                                                    key={index}
                                                  >
                                                    <div className="vs-pro">
                                                      <Link
                                                        to={`/product/${product.slug}`}
                                                      >
                                                        <img
                                                          src={product.avatar}
                                                          className="img-fluid"
                                                          alt=""
                                                        />
                                                      </Link>
                                                      <h3>
                                                        <Link
                                                          to={`/product/${product.slug}`}
                                                        >
                                                          {product.product_name}
                                                        </Link>
                                                      </h3>
                                                      <p>{product.info}</p>
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            );
                                          }
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                </Fade>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                        {categories.map((category, index) => {
                          return (
                            <div
                              key={index}
                              className={`tab-pane fade${
                                tab === category.slug ? " active show" : ""
                              }`}
                              id={`tab-${category.slug}`}
                              role="tabpanel"
                            >
                              <div
                                className={category.css_class || "vape-sat-tp"}
                                /*style={{ backgroundColor: category.bg_color }}*/
                              >
                                <div className="container">
                                  <div className="row">
                                    <div className="col-md-12">
                                      <h4>
                                        {category.category_page_title}
                                        <span>{category.description}</span>
                                      </h4>
                                      <p>{category.breadcrumb}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Fade bottom duration={800}>
                                <div className="vape-sat">
                                  <div className="container">
                                    <div className="row">
                                      {category.product.map(
                                        (product, index) => {
                                          return (
                                            <div
                                              className="col-md-4 align-bottom"
                                              key={index}
                                            >
                                              <div className="vs-pro">
                                                <Link
                                                  to={`/product/${product.slug}`}
                                                >
                                                  <img
                                                    src={product.avatar}
                                                    className="img-fluid"
                                                    alt=""
                                                  />
                                                </Link>
                                                <h3>
                                                  <Link
                                                    to={`/product/${product.slug}`}
                                                  >
                                                    {product.product_name}
                                                  </Link>
                                                </h3>
                                                <p>{product.info}</p>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </Fade>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Vapes;
