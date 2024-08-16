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

class Edibles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      header_contents: [],
      categories: [],
      products: [],
      loading: true,
      tab: "all",
      cat_img: "",
      cat_heading: "",
      cat_description: "",
      cat_slug: "",
      mainCat: props.match.params.maincat,
      mainTab: props.match.params.tab || "all",
    };
  }
  myCDM = async () => {
    window.scrollTo(0, 0);
    // await this.setState({ tab: this.state.mainTab });
    // window.$(document).on("click", ".filter-button", function () {
    //   var value = window.$(this).data("filter");
    //   alert(value);
    //   window.$(".filter-button").removeClass("active");
    //   window.$(this).addClass("active");

    //   window.$(".filter").removeClass("animateToTop");
    //   window.$(".filter").hide();
    //   setTimeout(function () {
    //     if (value === "all") {
    //       //$('.filter').removeClass('hidden');
    //       window.$(".filter").addClass("animateToTop");
    //       window.$(".filter").show();
    //     } else {
    //       window.$(".filter." + value).addClass("animateToTop");
    //       window.$(".filter." + value).show();
    //     }
    //   }, 50);
    // });
    const mainCat = this.state.mainCat;
    axios
      .post(`${API_URL}/all-product/${mainCat}`)
      .then((response) => {
        if (response.data.success === "true") {
          var sub_categories = response.data.sub_categories;
          var categories = [];
          var products = [];
          var header_contents = [];
          header_contents[0] = {
            heading: response.data.heading,
            description: ReactHtmlParser(response.data.sub_heading),
            slug: "all-cat",
          };
          axios(`${API_URL}/all-edibles-list`)
            .then((response) => {
              if (response.data.success === "true") {
                header_contents[0] = {
                  ...header_contents[0],
                  img: response.data.all_edibles.header_img,
                };
                this.setState({
                  loading: false,
                  cat_img: header_contents[0].img,
                  cat_heading: header_contents[0].heading,
                  cat_description: header_contents[0].description,
                  cat_slug: header_contents[0].slug,
                });
              }
            })
            .catch((err) => {
              this.setState({ loading: false });
            });

          for (var i = 0; i < sub_categories.length; i++) {
            categories.push(
              <button
                className={`btn btn-default filter-button fbtn${i + 1}${
                  this.state.tab === sub_categories[i].slug ? " active" : ""
                }`}
                data-filter={sub_categories[i].slug}
                id={i + 1}
                onClick={this.changeHeaderContents}
              >
                {sub_categories[i].category_name}
              </button>
            );
            header_contents[i + 1] = {
              img: sub_categories[i].header_img,
              heading: sub_categories[i].category_page_title,
              description: ReactHtmlParser(sub_categories[i].description),
              slug: "sub-cat",
            };
            if (sub_categories[i].product.length > 0) {
              for (var j = 0; j < sub_categories[i].product.length; j++) {
                products.push(
                  <div
                    key={j}
                    className={`gallery_product col-lg-4 col-md-4 col-sm-4 col-xs-6 filter ${
                      sub_categories[i].slug
                    }${
                      this.state.tab === "all" ||
                      this.state.tab === sub_categories[i].slug
                        ? " animateToTop"
                        : ""
                    }`}
                    style={{
                      display:
                        this.state.tab === "all" ||
                        this.state.tab === sub_categories[i].slug
                          ? "block"
                          : "none",
                    }}
                  >
                    <Link to={`/product/${sub_categories[i].product[j].slug}`}>
                      <img
                        src={sub_categories[i].product[j].avatar}
                        className="img-fluid"
                        alt=""
                      />
                    </Link>
                    {/* img-prd */}
                    <h3>
                      <Link
                        to={`/product/${sub_categories[i].product[j].slug}`}
                      >
                        {" "}
                        {sub_categories[i].product[j].product_name}
                      </Link>{" "}
                    </h3>
                    <p>{sub_categories[i].product[j].info}</p>
                  </div>
                );
              }
            } else {
              // products.push(
              //   <div
              //     key={j}
              //     className={`gallery_product col-lg-12 no-products filter ${
              //       sub_categories[i].slug
              //     }${
              //       this.state.tab === "all" ||
              //       this.state.tab === sub_categories[i].slug
              //         ? " animateToTop"
              //         : ""
              //     }`}
              //     style={{
              //       display:
              //         this.state.tab === "all" ||
              //         this.state.tab === sub_categories[i].slug
              //           ? "block"
              //           : "none",
              //     }}
              //   >
              //     No product available at the moment.
              //   </div>
              // );
            }
          }

          this.setState({
            header_contents,
            categories,
            products,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  };
  async componentDidMount() {
    await this.myCDM();
  }
  changeHeaderContents = async (e) => {
    var value = e.currentTarget.dataset.filter;
    var btnId = e.target.id;
    // alert(value);

    if (!this.state.loading) {
      await this.setState({
        cat_img: this.state.header_contents[e.target.id].img,
        cat_heading: this.state.header_contents[e.target.id].heading,
        cat_description: this.state.header_contents[e.target.id].description,
        cat_slug: this.state.header_contents[e.target.id].slug,
      });
      window.$(".filter-button").removeClass("active");
      window.$(".fbtn" + btnId).addClass("active");

      window.$(".filter").removeClass("animateToTop");
      window.$(".filter").hide();
      setTimeout(function () {
        if (value === "all") {
          //$('.filter').removeClass('hidden');
          window.$(".filter").addClass("animateToTop");
          window.$(".filter").show();
        } else {
          window.$(".filter." + value).addClass("animateToTop");
          window.$(".filter." + value).show();
        }
      }, 50);
    }
  };
  componentWillReceiveProps = (nextProps, nextState) => {
    // alert(nextProps.match.params.maincat);
    this.setState(
      {
        // mainCat: nextProps.match.params.maincat,
        // mainTab: nextProps.match.params.tab || "all",
        header_contents: [],
        categories: [],
        products: [],
        loading: true,
        tab: "all",
        cat_img: "",
        cat_heading: "",
        cat_description: "",
        cat_slug: "",
        mainCat: nextProps.match.params.maincat,
        mainTab: nextProps.match.params.tab || "all",
      },
      () => {
        this.myCDM();
      }
    );
  };
  render() {
    const {
      tab,
      categories,
      products,
      loading,
      cat_heading,
      cat_description,
      cat_img,
      cat_slug,
    } = this.state;
    const override = css`
      display: block;
      margin: 100px auto;
    `;
    return (
      <div
        className="aboutus-page page"
        style={{ backgroundImage: `url('${cat_img}')` }}
        // style={{ background: "black" }}
      >
        <TopNav />
        {!loading ? (
          <Fade duration={1800}>
            <div className="pro-listing main-container">
              <div className="container mt15">
                <div className="row">
                  <div className="gallery col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div align="center">
                      <button
                        className={`btn btn-default filter-button fbtn0${
                          tab === "all" ? " active" : ""
                        }`}
                        data-filter="all"
                        id={0}
                        onClick={this.changeHeaderContents}
                      >
                        All
                      </button>
                      {categories.map((category) => category)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 nlrp">
                    <div className={`edi-process prd-product-bg ${cat_slug}`}>
                      <div className="edi-hd-bg">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              <h4>
                                {cat_heading}
                                <span>{cat_description}</span>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="container">
                      <div className="row">
                        {/* {products.length} */}
                        {products.map((product, index) => product)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </Fade>
        ) : (
          <div className="sweet-loading">
            <ClipLoader
              css={override}
              size={25}
              color={"#3c3c3c"}
              loading={loading}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Edibles;
