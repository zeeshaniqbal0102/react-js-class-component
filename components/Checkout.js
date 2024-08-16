import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import TextFieldGroup from "./includes/TextFieldGroup";
import SelectFieldGroup from "./includes/SelectFieldGroup";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API_URL } from "../store/actions/types";
import { submitOrder } from "../store/actions/orderActions";
import Fade from "react-reveal/Fade";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      cart: [],
      countries: [],
      errors: {},
      shipping_address_line_1: "",
      shipping_address_line_2: "",
      shipping_country_id: "",
      shipping_state: "",
      shipping_city: "",
      shipping_zip_code: "",
      is_same_billing_address: true,
      billing_address_line_1: "",
      billing_address_line_2: "",
      billing_country_id: "",
      billing_state: "",
      billing_city: "",
      billing_zip_code: "",
      card_holder_name: "",
      card_number: "",
      exp_mm: "",
      exp_yy: "",
      cvv: "",
      shippingFees: 0,
      orderTotal: 0,
      grandTotal: 0,
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      localStorage.getItem("SantaCruzCart") &&
      JSON.parse(localStorage.getItem("SantaCruzCart")).length > 0
    ) {
      const user_cart = JSON.parse(localStorage.getItem("SantaCruzCart"));

      var orderTotal = 0,
        grandTotal = 0,
        cart = [];

      user_cart.map((item) => {
        orderTotal += item.price * item.quantity;
        cart.push({ product_id: item.id, qty: item.quantity });
        return "";
      });
      grandTotal = orderTotal;
      this.setState({ cart, orderTotal, grandTotal });
    } else {
      this.props.history.push("/cart");
    }
    axios(API_URL + "/all-countries")
      .then((response) => {
        if (response.data.success) {
          this.setState({
            shippingFees: response.data.shipping_fees,
            countries: [
              { value: "", label: "--Select Country--" },
              ...response.data.countries,
            ],
          });
        }
      })
      .catch((e) => alert("Something went wrong"));
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    if (e.target.name === "is_same_billing_address") {
      this.setState({
        is_same_billing_address: !this.state.is_same_billing_address,
      });
      window.$("#billing_address").slideToggle();
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };
  startStopLoading = (loading) => {
    this.setState({ loading });
  };
  handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    } else {
      const orderData = {
        cart: this.state.cart,
        shipping_address_line_1: this.state.shipping_address_line_1,
        shipping_address_line_2: this.state.shipping_address_line_2,
        shipping_country_id: this.state.shipping_country_id,
        shipping_state: this.state.shipping_state,
        shipping_city: this.state.shipping_city,
        shipping_zip_code: this.state.shipping_zip_code,
        is_same_billing_address: this.state.is_same_billing_address,
        billing_address_line_1: this.state.billing_address_line_1,
        billing_address_line_2: this.state.billing_address_line_2,
        billing_country_id: this.state.billing_country_id,
        billing_state: this.state.billing_state,
        billing_city: this.state.billing_city,
        billing_zip_code: this.state.billing_zip_code,
        card_holder_name: this.state.card_holder_name,
        card_number: this.state.card_number,
        expiration_month: this.state.exp_mm,
        expiration_year: this.state.exp_yy,
        cvv: this.state.cvv,
        instruction: this.props.instruction,
      };

      this.props.submitOrder(
        orderData,
        this.props.history,
        this.startStopLoading
      );
    }
  };
  render() {
    const {
      loading,
      shipping_address_line_1,
      shipping_address_line_2,
      shipping_country_id,
      shipping_state,
      shipping_city,
      shipping_zip_code,
      is_same_billing_address,
      billing_address_line_1,
      billing_address_line_2,
      billing_country_id,
      billing_state,
      billing_city,
      billing_zip_code,
      card_holder_name,
      card_number,
      exp_mm,
      exp_yy,
      cvv,
      countries,
      errors,
      orderTotal,
      shippingFees,
      grandTotal,
    } = this.state;
    const override = css`
      display: block;
      margin: 50px auto;
    `;
    var expy = [{ value: "", label: "--YY--" }];
    var expm = [
      { value: "", label: "--MM--" },
      { value: "01", label: "01" },
      { value: "02", label: "02" },
      { value: "03", label: "03" },
      { value: "04", label: "04" },
      { value: "05", label: "05" },
      { value: "06", label: "06" },
      { value: "07", label: "07" },
      { value: "08", label: "08" },
      { value: "09", label: "09" },
      { value: "10", label: "10" },
      { value: "11", label: "11" },
      { value: "12", label: "12" },
    ];
    var d = new Date();
    var currentYear = parseInt(d.getFullYear().toString().substr(-2));
    for (var i = currentYear; i <= currentYear + 15; i++) {
      expy.push({ value: i, label: i });
    }

    return (
      <div className="page-shopping-cart">
        <TopNav />
        <Fade duration={1800}>
          <div className="scart">
            <div className="pb-5">
              <div className="container container-checkout">
                <div className="row">
                  <div className="col-md-4 order-md-2 mb-4">
                    {/*-- Cart Summary --*/}
                    <div className="row py-5 p-4 bg-white rounded shadow-sm sticky-top">
                      <div className="col-lg-12">
                        <div className="rounded-pill px-4 py-3 sc-sec-hd">
                          Order summary{" "}
                        </div>
                        <div className="p-4">
                          <p className="sc-sec-cnt">
                            Shipping and additional costs are calculated based
                            on products you selected.
                          </p>
                          <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Order Subtotal </strong>
                              <strong>${orderTotal}</strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Shipping and handling</strong>
                              <strong>${shippingFees}</strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Total</strong>
                              <h5 className="font-weight-bold">
                                ${grandTotal + parseFloat(shippingFees)}
                              </h5>
                            </li>
                          </ul>
                          {/* <a
                          href="#"
                          className="btn btn-dark rounded-pill py-2 btn-block btn-sc"
                        >
                          Procceed to checkout
                        </a> */}
                        </div>
                      </div>
                    </div>
                    {/*- Cart Summary ends -*/}
                  </div>
                  <div className="col-md-8 order-md-1 cout-form">
                    <form
                      className="needs-validation"
                      onSubmit={this.handleOrderSubmit}
                    >
                      <h4 className="mb-3">Shipping address</h4>
                      <div className="mb-3">
                        <label htmlFor="shipping_address_line_1">
                          Address Line 1
                        </label>
                        <TextFieldGroup
                          name="shipping_address_line_1"
                          id="shipping_address_line_1"
                          placeholder=""
                          value={shipping_address_line_1}
                          error={errors.shipping_address_line_1}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="shipping_address_line_2">
                          Address Line 2{" "}
                          <span className="text-muted">(Optional)</span>
                        </label>
                        <TextFieldGroup
                          name="shipping_address_line_2"
                          id="shipping_address_line_2"
                          placeholder=""
                          value={shipping_address_line_2}
                          error={errors.shipping_address_line_2}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="shipping_country_id">Country</label>
                          <SelectFieldGroup
                            name="shipping_country_id"
                            id="shipping_country_id"
                            list={countries}
                            onChange={this.onChange}
                            value={shipping_country_id}
                            error={errors.shipping_country_id}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="shipping_state">State</label>
                          <TextFieldGroup
                            name="shipping_state"
                            id="shipping_state"
                            placeholder=""
                            value={shipping_state}
                            error={errors.shipping_state}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <label htmlFor="shipping_city">City</label>
                          <TextFieldGroup
                            name="shipping_city"
                            id="shipping_city"
                            placeholder=""
                            value={shipping_city}
                            error={errors.shipping_city}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="shipping_zip_code">Zip Code</label>
                          <TextFieldGroup
                            name="shipping_zip_code"
                            id="shipping_zip_code"
                            placeholder=""
                            value={shipping_zip_code}
                            error={errors.shipping_zip_code}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <hr className="mb-4" />
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          name="is_same_billing_address"
                          id="is_same_billing_address"
                          defaultChecked={is_same_billing_address}
                          className="custom-control-input"
                          onChange={this.onChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="is_same_billing_address"
                        >
                          Billing address is the same as my shipping address
                        </label>

                        {errors.is_same_billing_address && (
                          <div className="invalid-feedback">
                            <small>{errors.is_same_billing_address}</small>
                          </div>
                        )}
                      </div>
                      <hr className="mb-4" />
                      <div id="billing_address" className="hide">
                        <h4 className="mb-3">Billing address</h4>
                        <div className="mb-3">
                          <label htmlFor="billing_address_line_1">
                            Address Line 1
                          </label>
                          <TextFieldGroup
                            name="billing_address_line_1"
                            id="billing_address_line_1"
                            placeholder=""
                            value={billing_address_line_1}
                            error={errors.billing_address_line_1}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="mb-3">
                          <label htmlFor="billing_address_line_2">
                            Address Line 2{" "}
                            <span className="text-muted">(Optional)</span>
                          </label>
                          <TextFieldGroup
                            name="billing_address_line_2"
                            id="billing_address_line_2"
                            placeholder=""
                            value={billing_address_line_2}
                            error={errors.billing_address_line_2}
                            onChange={this.onChange}
                          />
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="billing_country_id">Country</label>
                            <SelectFieldGroup
                              name="billing_country_id"
                              id="billing_country_id"
                              list={countries}
                              onChange={this.onChange}
                              value={billing_country_id}
                              error={errors.billing_country_id}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="billing_state">State</label>
                            <TextFieldGroup
                              name="billing_state"
                              id="billing_state"
                              placeholder=""
                              value={billing_state}
                              error={errors.billing_state}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <label htmlFor="billing_city">City</label>
                            <TextFieldGroup
                              name="billing_city"
                              id="billing_city"
                              placeholder=""
                              value={billing_city}
                              error={errors.billing_city}
                              onChange={this.onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label htmlFor="billing_zip_code">Zip Code</label>
                            <TextFieldGroup
                              name="billing_zip_code"
                              id="billing_zip_code"
                              placeholder=""
                              value={billing_zip_code}
                              error={errors.billing_zip_code}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                      </div>
                      <h4 className="mb-3">Payment</h4>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="card_holder_name">Name on card</label>
                          <TextFieldGroup
                            name="card_holder_name"
                            id="card_holder_name"
                            placeholder=""
                            value={card_holder_name}
                            error={errors.card_holder_name}
                            onChange={this.onChange}
                            info="Full name as displayed on card"
                          />
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="cc-number">Credit card number</label>
                          <TextFieldGroup
                            type="number"
                            name="card_number"
                            id="card_number"
                            placeholder=""
                            value={card_number}
                            error={errors.card_number}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 mb-3">
                          <label htmlFor="exp_mm">Expiration Month</label>
                          <SelectFieldGroup
                            name="exp_mm"
                            id="exp_mm"
                            list={expm}
                            onChange={this.onChange}
                            value={exp_mm}
                            error={errors.expiration_month}
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <label htmlFor="exp_yy">Expiration Year</label>
                          <SelectFieldGroup
                            name="exp_yy"
                            id="exp_yy"
                            list={expy}
                            onChange={this.onChange}
                            value={exp_yy}
                            error={errors.expiration_year}
                          />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="cvv">CVV</label>
                          <TextFieldGroup
                            name="cvv"
                            id="cvv"
                            placeholder=""
                            value={cvv}
                            error={errors.cvv}
                            onChange={this.onChange}
                          />
                        </div>
                      </div>
                      <hr className="mb-4" />
                      <button
                        className="btn btn-primary btn-lg btn-block"
                        type="submit"
                      >
                        Submit Order
                      </button>
                      <div className="sweet-loading">
                        <ClipLoader
                          css={override}
                          size={25}
                          color={"#3c3c3c"}
                          loading={loading}
                        />
                      </div>
                    </form>
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
  instruction: state.instruction,
});

const mapDispatchToProps = { submitOrder };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Checkout));
