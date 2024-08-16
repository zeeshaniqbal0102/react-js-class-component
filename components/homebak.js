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

class Home extends Component {
  render() {
    return (
      <div>
        <TopNav position="absolute" />
        <Header />
        <HomeProducts />
        <CBDBanner />
        <Technology />
        <LightSativa />
        <OriginalBluedream />
        <HmReserve />
        <FromPlant />
        <FindSantaCruz />
        <Footer />
      </div>
    );
  }
}

export default Home;
