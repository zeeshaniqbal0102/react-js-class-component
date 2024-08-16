import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect, withRouter } from "react-router-dom";
// import TextAreaGroup from "./includes/TextAreaGroup";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import { API_URL } from "../store/actions/types";
import { updateInstruction } from "../store/actions/orderActions";
import Fade from "react-reveal/Fade";
import axios from "axios";

class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      instruction: "",
      shippingAndHandling: 0,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios(API_URL + "/get-shipping-fees")
      .then((response) => {
        if (response.data.success) {
          this.setState({ shippingAndHandling: response.data.shipping_fee });
        } else {
          console.log("Could not get shipping fees.");
        }
      })
      .catch((e) => console.log("Something went wrong"));
    this.setState({
      instruction: this.props.instruction,
    });
    if (
      localStorage.getItem("SantaCruzCart") &&
      JSON.parse(localStorage.getItem("SantaCruzCart")).length > 0
    ) {
      this.setState({
        cart: JSON.parse(localStorage.getItem("SantaCruzCart")),
      });
    }
  }

  increaseQuantity = async (index) => {
    var cart = [
      ...this.state.cart.slice(0, index),
      {
        ...this.state.cart[index],
        quantity: this.state.cart[index].quantity + 1,
      },
      ...this.state.cart.slice(index + 1),
    ];
    await this.setState({ cart });
    localStorage.setItem("SantaCruzCart", JSON.stringify(this.state.cart));
  };

  decreaseQuantity = async (index) => {
    if (this.state.cart[index].quantity > 1) {
      var cart = [
        ...this.state.cart.slice(0, index),
        {
          ...this.state.cart[index],
          quantity: this.state.cart[index].quantity - 1,
        },
        ...this.state.cart.slice(index + 1),
      ];
      await this.setState({ cart });
      localStorage.setItem("SantaCruzCart", JSON.stringify(this.state.cart));
    }
  };

  removeItem = async (index) => {
    if (window.confirm("Are you sure to delete product from cart?")) {
      var cart = [...this.state.cart];
      cart.splice(index, 1);
      await this.setState({ cart });
      await localStorage.setItem(
        "SantaCruzCart",
        JSON.stringify(this.state.cart)
      );

      if (this.state.cart.length === 0) {
        window.$(".icon-cart").attr("src", "images/cart-icon.png");
      }
    }
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  gotoCheckout = (e) => {
    e.preventDefault();
    this.props.updateInstruction(this.state.instruction);
    this.props.history.push("/checkout");
  };

  render() {
    const { cart, shippingAndHandling } = this.state;
    const { setting } = this.props;
    let grandTotal = 0,
      CartList = [];

    CartList = cart.map((item, index) => {
      const subTotal = item.price * item.quantity;
      grandTotal += subTotal;
      return (
        <tr key={index}>
          <th scope="row" className="border-0">
            <div className="p-2">
              <img
                src={item.productAvatar}
                alt=""
                width={70}
                className="img-fluid rounded shadow-sm"
              />
              <div className="ml-3 d-inline-block align-middle">
                <h5 className="mb-0">
                  <Link
                    to={`/product/${item.productSlug}`}
                    className="text-dark d-inline-block align-middle"
                  >
                    {item.productName}
                  </Link>
                </h5>
                <span className="text-muted d-block">{item.productInfo}</span>
              </div>
            </div>
          </th>
          <td className="border-0 align-middle sprice">${item.price}</td>
          <td className="border-0 align-middle sprice">
            <button onClick={() => this.decreaseQuantity(index)}>
              <b>-</b>
            </button>
            <button>
              <b>{item.quantity}</b>
            </button>
            <button onClick={() => this.increaseQuantity(index)}>
              <b>+</b>
            </button>
          </td>
          <td className="border-0 align-middle sprice">${subTotal}</td>
          <td className="border-0 align-middle">
            <Link
              className="text-dark"
              onClick={() => this.removeItem(index)}
              replace
            >
              <i className="fa fa-trash"></i>
            </Link>
          </td>
        </tr>
      );
    });

    return setting.showCart || setting.showLogin ? (
      <div className="page-shopping-cart">
        <TopNav />
        <Fade duration={1800}>
          <div className="scart">
            <div className="pb-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-12 p-5 mb-5">
                    {/* Shopping cart table */}
                    <div className="table-responsive cart-table">
                      {CartList.length > 0 ? (
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col" className="border-0 cart-tb-hd">
                                <div className="p-2 px-3">Product</div>
                              </th>
                              <th scope="col" className="border-0 cart-tb-hd">
                                <div className="py-2">Price</div>
                              </th>
                              <th scope="col" className="border-0 cart-tb-hd">
                                <div className="py-2">Quantity</div>
                              </th>
                              <th scope="col" className="border-0 cart-tb-hd">
                                <div className="py-2">Sub Total</div>
                              </th>
                              <th scope="col" className="border-0">
                                <div className="py-2 text-uppercase"></div>
                              </th>
                            </tr>
                          </thead>
                          <tbody>{CartList}</tbody>
                        </table>
                      ) : (
                        <div className="rounded-pill px-4 py-3 sc-sec-hd">
                          Your shopping cart is empty
                        </div>
                      )}
                    </div>
                    {/* End */}
                  </div>
                </div>
                {CartList.length > 0 ? (
                  <form onSubmit={this.gotoCheckout}>
                    <div className="row py-5 p-4 bg-white rounded shadow-sm">
                      {/* <div className="col-lg-6">
                        <div className="rounded-pill px-4 py-3 sc-sec-hd">
                          Instructions for seller
                        </div>
                        <div className="p-4">
                          <p className="sc-sec-cnt">
                            If you have some information for the seller you can
                            leave them in the box below
                          </p>
                          <TextAreaGroup
                            name="instruction"
                            id="instruction"
                            value={instruction}
                            onChange={this.onChange}
                          />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="rounded-pill px-4 py-3 sc-sec-hd">
                          Order summary{" "}
                        </div>
                        <div className="p-4">
                          <p className="sc-sec-cnt">
                            Shipping and additional costs are calculated based
                            on values you have entered.
                          </p>
                          <ul className="list-unstyled mb-4">
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Order Total </strong>
                              <strong>${grandTotal}</strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Shipping and handling</strong>
                              <strong>${shippingAndHandling}</strong>
                            </li>
                            <li className="d-flex justify-content-between py-3 border-bottom pricing-table">
                              <strong>Grand Total</strong>
                              <strong>
                                {"$" +
                                  (grandTotal +
                                    parseFloat(shippingAndHandling))}{" "}
                              </strong>
                            </li>
                          </ul>
                          <button
                            type="submit"
                            className="btn btn-dark rounded-pill py-2 btn-block btn-sc"
                          >
                            Proceed to checkout
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Footer />
        </Fade>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProps = (state) => ({
  instruction: state.instruction,
  setting: state.setting,
});

export default connect(mapStateToProps, { updateInstruction })(
  withRouter(ShoppingCart)
);
