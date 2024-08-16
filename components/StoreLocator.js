import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
// import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import { GoogleMap, InfoWindow, LoadScript } from "@react-google-maps/api";
// import Geocode from "react-geocode";
import { API_URL } from "../store/actions/types";
import axios from "axios";
import { getDistance } from "geolib";
import Fade from "react-reveal/Fade";
import { deviceType } from "react-device-detect";

class StoreLocator extends Component {
  constructor() {
    super();
    this.state = {
      postcode: "",
      selected_store_products: [],
      store_distance: 0,
      bgImage: "",
      bgImageMobile: "",
      product_id: null,
      productsDD: [],
      stores: [],
      totalPages: 0,
      totalStroes: 0,
      current_latitude: 25.774987,
      current_longitude: -80.193849,
      user_latitude: null,
      user_longitude: null,
      selectedStore: null,
      totalRecords: 0,
      currentPage: 1,
      loading: true,
      pageHeading: "",
      pageDescription: "",
    };
  }
  async componentDidMount() {
    window.scrollTo(0, 0);
    var productId = this.props.match.params.id || -1;
    var defaultProduct = null;
    if (this.props.location.search) {
      await this.setState({
        postcode: this.props.location.search.replace("?postcode=", ""),
      });
    }
    const location = window.navigator && window.navigator.geolocation;
    if (location) {
      location.getCurrentPosition(
        async (position) => {
          await this.setState(
            {
              current_latitude: position.coords.latitude,
              current_longitude: position.coords.longitude,
              user_latitude: position.coords.latitude,
              user_longitude: position.coords.longitude,
            },
            () => {
              this.getStores(1, "", null);
            }
          );
        },
        (error) => {
          // window.$("#currentLocation").prop("checked", false);
          // window.$("#currentLocation").prop("disabled", true);
          window.$("#btnNearby").prop("disabled", true);
          this.getStores(1, "", null);
        }
      );
    } else {
      window.$("#btnNearby").prop("disabled", true);
      this.getStores(1, "", null);
    }

    axios(`${API_URL}/store-data`)
      .then(async (response) => {
        if (response.data.success === "true") {
          var product_id = null;
          var productsDD = response.data.products.map((product, index) => {
            if (product.id === parseInt(productId)) {
              product_id = product.id;
              defaultProduct = {
                value: product.id,
                label: product.product_name,
              };
            }
            return { value: product.id, label: product.product_name };
          });

          this.setState({
            bgImage: response.data.img.bg_img,
            bgImageMobile: response.data.img.bg_img_mob,
            pageHeading: response.data.img.line_1,
            pageDescription: response.data.img.line_2,
            productsDD,
            product_id,
            defaultProduct,
          });
        } else {
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log("Could not get banner image, Something went wrong.");
      });
  }

  getStores = (page, q, product_id) => {
    this.setState({
      loading: true,
    });
    axios
      .post(`${API_URL}/stores?q=${q}&page=${page}`, { product_id })
      .then((res) => {
        if (res.data.success) {
          var stores = [];
          if (this.state.user_latitude && res.data.stores.data.length > 0) {
            stores = res.data.stores.data.map((store, index) => {
              return {
                ...store,
                distance: getDistance(
                  {
                    latitude: this.state.user_latitude,
                    longitude: this.state.user_longitude,
                  },
                  {
                    latitude: store.latitude,
                    longitude: store.longitude,
                  }
                ),
              };
            });
          } else {
            stores = res.data.stores.data;
          }
          this.setState({
            loading: false,
            stores,
            totalPages: res.data.stores.last_page,
            currentPage: res.data.stores.current_page,
            totalStroes: res.data.stores.total,
          });
        } else {
          this.setState({
            loading: false,
          });
          alert("Something went wrong.");
        }
      })
      .catch((err) => {
        console.log("Could not get banner image, Something went wrong.");
      });
  };

  handlePostCodeChange = (e) => {
    this.setState({ postcode: e.target.value });
  };
  handleKeyPressed = (e) => {
    if (e.key === "Enter") {
      this.getStores(1, this.state.postcode, this.state.product_id);
    }
  };

  handleProductChange = async (e) => {
    await this.setState({ product_id: e ? e.value : null, defaultProduct: e });
    this.getStores(1, this.state.postcode, e ? e.value : null);
  };

  showInMap = (store) => {
    // window.$("#storeLocator").show();
    axios(`${API_URL}/store-products/${store.id}`)
      .then(async (response) => {
        if (response.data.success) {
          this.setState({
            selectedStore: response.data.store,
            store_distance: this.state.user_latitude
              ? getDistance(
                  {
                    latitude: this.state.user_latitude,
                    longitude: this.state.user_longitude,
                  },
                  {
                    latitude: response.data.store.latitude,
                    longitude: response.data.store.longitude,
                  }
                )
              : 0,
            selected_store_products: response.data.store.product,
          });
        } else {
          alert("No product found in store");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("Something went wrong.");
      });
  };

  getDirection = async (ult, ulg, slt, slg) => {
    // var origin = "",
    //   destination = "";
    // Geocode.setApiKey("AIzaSyAhljR8ZgU0XA9nI50x527MnRuYvcKhCMg");
    // Geocode.setLanguage("en");
    // Geocode.setRegion("us");
    // Geocode.enableDebug();
    // await Geocode.fromLatLng(ult, ulg).then(
    //   async (response) => {
    //     const address = response.results[0].formatted_address;
    //     origin = address;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
    // // alert(to_address);
    // await Geocode.fromLatLng(slt, slg).then(
    //   async (response) => {
    //     const address = response.results[0].formatted_address;
    //     destination = address;
    //     // await this.setState({ destination: address });
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );

    window.open(`https://www.google.com/maps/dir/${ult},${ulg}/${slt},${slg}`);
  };

  render() {
    const {
      loading,
      postcode,
      current_latitude,
      current_longitude,
      user_latitude,
      user_longitude,
      bgImage,
      bgImageMobile,
      productsDD,
      defaultProduct,
      stores,
      totalStroes,
      selectedStore,
      store_distance,
      currentPage,
      totalPages,
      product_id,
      pageHeading,
      pageDescription,
    } = this.state;
    const mapContainerStyle = { width: "100%", height: "850px" };
    const mapCenter = {
      lat: selectedStore ? selectedStore.latitude : current_latitude,
      lng: selectedStore ? selectedStore.longitude : current_longitude,
    };

    return (
      <div className="about-page">
        <TopNav />
        <Fade duration={1800}>
          <div className="prd-header">
            {deviceType === "mobile" ? (
              <img src={bgImageMobile} className="img-fluid" alt="" />
            ) : (
              <img src={bgImage} className="img-fluid" alt="" />
            )}
            <div className="container container-title">
              <div className="row">
                <div className="col-md-12">
                  <h4 className="cat-heading">{pageHeading}</h4>
                  <span>{pageDescription}</span>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="ls-top">
                <div className="row">
                  <div className="col-md-7">
                    <div className="main">
                      {/* Another variation with a button */}
                      <div className="input-group">
                        <button id="btnNearby" type="button">
                          <i className="fa fa-map-marker" /> Search nearby
                        </button>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter city/post code"
                          value={postcode}
                          onChange={this.handlePostCodeChange}
                          onKeyPress={this.handleKeyPressed}
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-secondary btn-search"
                            type="button"
                            onClick={() =>
                              this.getStores(
                                1,
                                this.state.postcode,
                                this.state.product_id
                              )
                            }
                          >
                            <i className="fa fa-search" />
                          </button>
                        </div>
                        {/* <a href="#">Use current location</a>{" "} */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-3">
                    <label className="current-location">
                      <input
                        type="checkbox"
                        className="current-location"
                        name="current_location"
                        id="currentLocation"
                        onChange={this.getCurrentLocation}
                      />{" "}
                      Use current location
                    </label>
                  </div> */}
                  <div className="col-md-5">
                    <ReactSelect
                      value={defaultProduct}
                      isClearable={true}
                      options={productsDD}
                      placeholder="Search by product"
                      styles={{
                        control: (styles) => ({
                          ...styles,
                          backgroundColor: "#faf9f5",
                          padding: "5px 10px",
                        }),
                      }}
                      onChange={this.handleProductChange}
                    />
                  </div>
                </div>
              </div>
              <div className="map-area">
                <div className="row">
                  <div className="col-md-12">
                    <div className="ls-sc-area">
                      <div className="ls-sec_section">
                        <div className="ls-sec-top">
                          <ClipLoader
                            size={15}
                            color={"#ffffff"}
                            loading={loading}
                          />
                          {selectedStore ? (
                            <button
                              type="button"
                              className="btn-back-to-location"
                              onClick={() =>
                                this.setState({ selectedStore: null })
                              }
                            >
                              <i className="fa fa-chevron-left"></i> BACK TO
                              LOCATIONS
                            </button>
                          ) : !loading ? (
                            `${totalStroes} LOCATION FOUND`
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="ls-sec_box">
                          <div className="ls-sec_container">
                            <div className="background_layer" />
                            <div className="layer_content">
                              <div className="ls-sec_owlCarousel owl-carousel">
                                <div className="store-secs">
                                  {selectedStore ? (
                                    <>
                                      <div className="row row-store">
                                        <div className="col-9 store-info">
                                          <h6>{selectedStore.store_name}</h6>
                                          <div className="address">
                                            {selectedStore.store_address}{" "}
                                            {selectedStore.postcode}
                                          </div>
                                          <div className="product-found">
                                            {selectedStore.product_count}{" "}
                                            product
                                            {selectedStore.product_count > 1
                                              ? "s"
                                              : ""}{" "}
                                            found
                                          </div>
                                          {user_latitude ? (
                                            <div className="distance">
                                              {(
                                                store_distance / 1609.34
                                              ).toFixed(2) +
                                                ` Mile${
                                                  store_distance / 1609.34 > 1
                                                    ? "s"
                                                    : ""
                                                }`}
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </div>
                                        <div
                                          className={`col-3 direction-info${
                                            !user_latitude ? " right" : ""
                                          }`}
                                        >
                                          {user_latitude ? (
                                            <Link
                                              onClick={() =>
                                                this.getDirection(
                                                  user_latitude,
                                                  user_longitude,
                                                  selectedStore.latitude,
                                                  selectedStore.longitude
                                                )
                                              }
                                            >
                                              <img
                                                className="img-dir"
                                                src="/images/direction.png"
                                                alt=""
                                              />
                                              <br />
                                              Directions
                                            </Link>
                                          ) : (
                                            <div className="arrow-info">
                                              <i className="fa fa-chevron-right" />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <div className="row store-product-list">
                                        {selectedStore.product.map(
                                          (product, index) => (
                                            <div
                                              className="col-6 text-center"
                                              key={index}
                                            >
                                              <img
                                                src={`https://santacruzbrands.com/santa-cruz/api/public/products/${product.list_image}`}
                                                className="img-fluid"
                                                alt=""
                                              />

                                              <div className="product-name">
                                                <Link to={`/${product.link}`}>
                                                  {product.product_name}
                                                </Link>
                                              </div>
                                              <div className="product-info">
                                                {product.info}
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {stores.map((store, index) => {
                                        return (
                                          <div
                                            className="row row-store"
                                            key={index}
                                          >
                                            <div className="col-9 store-info">
                                              <Link
                                                onClick={() =>
                                                  this.showInMap(store)
                                                }
                                              >
                                                <h6>{store.store_name}</h6>
                                                <div className="address">
                                                  {store.store_address}{" "}
                                                  {store.postcode}
                                                </div>
                                                <div className="product-found">
                                                  {store.product_count} product
                                                  {store.product_count > 1
                                                    ? "s"
                                                    : ""}{" "}
                                                  found
                                                </div>
                                                {store.distance &&
                                                store.distance > 0 ? (
                                                  <div className="distance">
                                                    {(
                                                      store.distance / 1609.34
                                                    ).toFixed(2) +
                                                      ` Mile${
                                                        store.distance /
                                                          1609.34 >
                                                        1
                                                          ? "s"
                                                          : ""
                                                      }`}
                                                  </div>
                                                ) : (
                                                  ""
                                                )}
                                              </Link>
                                            </div>
                                            <div
                                              className={`col-3 direction-info${
                                                !user_latitude ? " right" : ""
                                              }`}
                                            >
                                              {user_latitude ? (
                                                <Link
                                                  onClick={() =>
                                                    this.getDirection(
                                                      user_latitude,
                                                      user_longitude,
                                                      store.latitude,
                                                      store.longitude
                                                    )
                                                  }
                                                >
                                                  <img
                                                    className="img-dir"
                                                    src="/images/direction.png"
                                                    alt=""
                                                  />
                                                  <br />
                                                  Directions
                                                </Link>
                                              ) : (
                                                <div className="arrow-info">
                                                  <i className="fa fa-chevron-right" />
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ls-sec-dn">
                          {!loading ? (
                            <>
                              <div className="ls-sec-total">
                                {totalStroes} Total Results
                              </div>
                              <div className="ls-sec-dis">
                                <button
                                  type="button"
                                  className="btn-store-nav prev"
                                  disabled={currentPage <= 1}
                                  onClick={() =>
                                    this.getStores(
                                      currentPage - 1,
                                      postcode,
                                      product_id
                                    )
                                  }
                                >
                                  <i className="fa fa-chevron-left"></i>
                                </button>
                                <div className="view-more">View More</div>
                                <button
                                  type="button"
                                  className="btn-store-nav next"
                                  disabled={currentPage >= totalPages}
                                  onClick={() =>
                                    this.getStores(
                                      currentPage + 1,
                                      postcode,
                                      product_id
                                    )
                                  }
                                >
                                  <i className="fa fa-chevron-right"></i>
                                </button>
                              </div>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <LoadScript googleMapsApiKey="AIzaSyAhljR8ZgU0XA9nI50x527MnRuYvcKhCMg">
                      <GoogleMap
                        id="storeLocator"
                        mapContainerStyle={mapContainerStyle}
                        zoom={15}
                        center={mapCenter}
                      >
                        {selectedStore ? (
                          <InfoWindow position={mapCenter}>
                            <div style={{ padding: "15px" }}>
                              <b
                                style={{
                                  display: "block",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  marginBottom: "10px",
                                }}
                              >
                                {selectedStore.store_name}
                              </b>
                              <div
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "10px",
                                }}
                              >
                                {selectedStore.store_address +
                                  ", " +
                                  selectedStore.postcode}
                              </div>
                              <div
                                style={{
                                  fontSize: "16px",
                                  color: "#89ba9b",
                                  fontWeight: "500",
                                }}
                              >
                                Total products: {selectedStore.product.length}
                              </div>
                              <div
                                style={{
                                  fontSize: "16px",
                                  marginTop: "10px",
                                }}
                              >
                                {user_latitude ? (
                                  <>
                                    Distance:{" "}
                                    {(store_distance / 1609.34).toFixed(2) +
                                      " Mile" +
                                      (store_distance / 1609.34 > 1 ? "s" : "")}
                                    <button
                                      onClick={() =>
                                        this.getDirection(
                                          // "44.023385",
                                          // "-116.945930",
                                          user_latitude,
                                          user_longitude,
                                          selectedStore.latitude,
                                          selectedStore.longitude
                                          // selectedStore.store_address +
                                          //   ", " +
                                          //   selectedStore.postcode +
                                          //   ", " +
                                          //   selectedStore.city +
                                          //   ", " +
                                          //   selectedStore.state
                                        )
                                      }
                                      className="btn-get-direction"
                                      disabled={user_latitude === null}
                                    >
                                      Get Direction
                                    </button>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </InfoWindow>
                        ) : (
                          ""
                        )}
                      </GoogleMap>
                    </LoadScript>
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

export default StoreLocator;
