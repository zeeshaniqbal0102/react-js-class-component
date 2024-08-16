import React, { Component } from "react";
import { Link } from "react-router-dom";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import UserHeader from "./includes/UserHeader";
import UserSidebar from "./includes/UserSidebar";
import axios from "axios";
import { API_URL } from "../store/actions/types";
import Fade from "react-reveal/Fade";

class MyOrders extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      orders: [],
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios
      .post(API_URL + "/all-orders")
      .then((response) => {
        if (response.data.success === "true") {
          this.setState({ orders: response.data.orders, loading: false });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { orders } = this.state;
    return (
      <div className="udb-page usr-page">
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
                            <h2>My Orders</h2>
                          </div>
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <th>Order Date</th>
                                <th>Order Total</th>
                                <th>Order Status</th>
                                <th></th>
                              </thead>
                              <tbody>
                                {orders.map((orders, index) => {
                                  return (
                                    <tr>
                                      <td className="border-0">
                                        <div className="p-2" key={index}>
                                          {orders.order_date}
                                        </div>
                                      </td>
                                      <td className="border-0 align-middle sprice">
                                        $
                                        {Math.round(orders.order_total).toFixed(
                                          2
                                        )}
                                      </td>
                                      <td className="border-0 align-middle sprice">
                                        {orders.status_name}
                                      </td>
                                      <td className="border-0 align-middle">
                                        <Link
                                          to={`/order-details/${orders.order_no}`}
                                          className="text-dark"
                                        >
                                          <i className="fa fa-eye" />
                                        </Link>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
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

export default MyOrders;
