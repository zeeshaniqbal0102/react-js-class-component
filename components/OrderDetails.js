import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import UserHeader from "./includes/UserHeader";
import UserSidebar from "./includes/UserSidebar";
import axios from "axios";
import { API_URL } from "../store/actions/types";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Fade from "react-reveal/Fade";

class OrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      order: [],
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.match.params.order_no) {
      axios
        .post(`${API_URL}/order-details/${this.props.match.params.order_no}`)

        .then((response) => {
          if (response.data.success === "true") {
            this.setState({
              order: response.data.orders[0],
              loading: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.setState({ loading: false });
        });
    }
  }
  render() {
    const { order, loading } = this.state;
    const override = css`
      display: block;
      margin: 100px auto;
    `;
    var shiping_fees = 0;

    return (
      <div className="udb-page">
        <TopNav />
        <Fade duration={1800}>
          <div className="udb">
            <div className="pb-5">
              <div className="udb-head-inner">
                <UserHeader />
              </div>
              <div className="row" />
              <div className="container">
                <div className="row">
                  <div className="udb-top-window">
                    <div className="row">
                      <div className="col-md-3">
                        <div className="udb-right">
                          <UserSidebar />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="udb-left">
                          <div className="olist">
                            <h2>Order Details</h2>
                          </div>
                          <div>
                            <ClipLoader
                              css={override}
                              size={25}
                              color={"#3c3c3c"}
                              loading={loading}
                            />
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <th>Product</th>
                                  <th>QTY</th>
                                  <th>Price</th>
                                  <th>Sub Total</th>
                                </thead>
                                <tbody>
                                  {order.order_products
                                    ? order.order_products.map(
                                        (order_product, index) => {
                                          return (
                                            <tr key={index}>
                                              <td>
                                                <Link
                                                  to={`/product/${order_product.slug}`}
                                                  className="text-dark d-inline-block align-middle"
                                                >
                                                  <img
                                                    src="images/pro-det-01.jpg"
                                                    alt=""
                                                    width={70}
                                                    className="img-fluid rounded shadow-sm"
                                                  />
                                                </Link>
                                                <div className="ml-3 d-inline-block align-middle">
                                                  <h5 className="mb-0">
                                                    <Link
                                                      to={`/product/${order_product.slug}`}
                                                      className="text-dark d-inline-block align-middle"
                                                    >
                                                      {
                                                        order_product.product_name
                                                      }
                                                    </Link>
                                                  </h5>
                                                  <span className="text-muted d-block"></span>{" "}
                                                </div>
                                              </td>
                                              <td>{order_product.qty}</td>
                                              <td>
                                                $
                                                {Math.round(
                                                  order_product.price
                                                ).toFixed(2)}
                                              </td>
                                              <td>
                                                $
                                                {Math.round(
                                                  order_product.qty *
                                                    order_product.price
                                                ).toFixed(2)}
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )
                                    : null}
                                </tbody>
                              </table>
                            </div>
                            <div className="row py-5 p-4 bg-white rounded shadow-sm nlrm oddown">
                              <div className="col-lg-12">
                                <div className="row py-3 odetail">
                                  <div className="col-md-4">
                                    <div className="od-hd">Order Date:</div>
                                    <div className="od-cnt">
                                      {order.order_date}
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="od-hd">Order Number:</div>
                                    <div className="od-cnt">
                                      {order.order_no}
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div className="od-hd">Order Status:</div>
                                    <div className="od-cnt">
                                      {order.status_name}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="rounded-pill px-4 py-3 sc-sec-hd">
                                  Order Comments
                                </div>
                                <div className="p-4">
                                  <p className="sc-sec-cnt">
                                    {order.instruction}
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="rounded-pill px-4 py-3 sc-sec-hd">
                                  Shipping Address
                                </div>
                                <div className="p-4">
                                  <p className="sc-sec-cnt">
                                    {order.shipping_address_line_1} <br />
                                    {order.shipping_address_line_2},
                                    <br />
                                    {order.shipping_zip_code}
                                  </p>
                                </div>
                                <div className="rounded-pill px-4 py-3 sc-sec-hd">
                                  Billing Address
                                </div>
                                <div className="p-4">
                                  <p className="sc-sec-cnt">
                                    {order.billing_address_line_1} <br />
                                    {order.billing_address_line_2}
                                    <br />
                                    {order.billing_zip_code}
                                  </p>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="rounded-pill px-4 py-3 sc-sec-hd">
                                  Order summary{" "}
                                </div>
                                <div className="p-4">
                                  {/* <p className="sc-sec-cnt">
                                    Shipping and additional costs are calculated
                                    based on values you have entered.
                                  </p> */}
                                  <ul className="list-unstyled mb-4">
                                    <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                                      <strong>Order Total </strong>
                                      <strong>
                                        $
                                        {Math.round(order.order_total).toFixed(
                                          2
                                        )}
                                      </strong>
                                    </li>
                                    <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                                      <strong>Shipping and handling</strong>
                                      <strong>
                                        ${Math.round(shiping_fees).toFixed(2)}
                                      </strong>
                                    </li>
                                    <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                                      <strong>Grand Total</strong>
                                      <strong>
                                        $
                                        {Math.round(
                                          order.order_total + shiping_fees
                                        ).toFixed(2)}
                                      </strong>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default OrderDetails;
