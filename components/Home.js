import React, { Component } from "react";
import TopNav from "./includes/TopNav";
import Header from "./includes/Header";
import HomeProducts from "./includes/HomeProducts";
import CBDBanner from "./includes/CBDBanner";
import Technology from "./includes/Technology";
import LightSativa from "./includes/LightSativa";
import OriginalBluedream from "./includes/OriginalBluedream";
import HmReserve from "./includes/HmReserve";
import FromPlant from "./includes/FromPlant";
import FindSantaCruz from "./includes/FindSantaCruz";
import Footer from "./includes/Footer";
import { API_URL } from "../store/actions/types";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      homeData: {},
      home_products: [],
      loading: true,
    };
  }
  componentDidMount() {
    window.$(".nav-placeholder").remove();
    window.scrollTo(0, 0);
    axios
      .get(API_URL + "/homepage")
      .then((response) => {
        if (response.data.success) {
          this.setState({
            homeData: response.data.home,
            home_products: response.data.home_products,
            loading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }
  render() {
    const { homeData, home_products, loading } = this.state;
    return (
      <div className="page">
        <TopNav position="absolute" />
        <Header content={homeData.section_1} loading={loading} />
        <HomeProducts products={home_products} loading={loading} />
        <CBDBanner content={homeData.section_2} loading={loading} />
        <Technology content={homeData.section_3} loading={loading} />
        <LightSativa content={homeData.section_4} loading={loading} />
        <OriginalBluedream content={homeData.section_5} loading={loading} />
        <HmReserve content={homeData.section_6} loading={loading} />
        <FromPlant content={homeData.section_7} loading={loading} />
        <FindSantaCruz content={homeData.section_8} loading={loading} />
        <Footer />
      </div>
    );
  }
}

export default Home;
