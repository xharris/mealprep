import React from "react";

import Body from "@feature/body";
import Header from "@feature/header";
import Map from "@feature/map";

import styled from "styled-components";
// import "@style/home.scss";

const S = {
  Home: styled.div`
    width: 100%;
    height: 100%;
  `
};

const Home = () => {
  return (
    <S.Home>
      <Header />
      <Body>
        <Map />
      </Body>
    </S.Home>
  );
};

export default Home;
