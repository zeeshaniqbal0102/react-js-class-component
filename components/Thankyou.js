import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Footer from "./includes/Footer";
import Fade from "react-reveal/Fade";
import { API_URL } from "../store/actions/types";
import axios from "axios";

class Thankyou extends Component {
  constructor() {
    super();
    this.state = {
      bgImage: "",
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    axios(`${API_URL}/about-banner-img`)
      .then(async (response) => {
        if (response.data.success === "true") {
          this.setState({ bgImage: response.data.img.bg_img });
        }
      })
      .catch((err) => {
        console.log("Could not get banner image, Something went wrong.");
      });
  }
  render() {
    const { bgImage } = this.state;
    return (
      <div className="map-page" style={{ backgroundImage: `url(${bgImage})` }}>
        <TopNav />
        <Fade duration={1800}>
          <div className="udb-store">
            <div className="pb-5">
              <div className="udb-hd-bg">
                <div className="container-fluid nlrp">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="main-title">
                          <h2>Thank you for placing your order</h2>
                          <p>
                            Your order #{this.props.match.params.order_no} has
                            been submitted successfully.
                          </p>
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

export default Thankyou;
