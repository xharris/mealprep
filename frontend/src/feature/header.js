import React from "react";
import { S } from "@style/header";

import img_cookbook from "@image/cookbook.png";

const HeaderPage = props => {
  return (
    <S.HeaderPage className="header-page" {...props}>
      <div className="subcontainer">
        <div className="text">{props.text}</div>
        <div className="subtext">{props.subtext}</div>
      </div>
      {props.image && <img src={props.image} alt="" />}
    </S.HeaderPage>
  );
};

const HeaderSeparator = () => <div className="header-separator" />;

const Header = () => {
  return (
    <>
      <S.Header className="header">
        <div className="logo">LOGO</div>
        <div className="pages-container">
          <HeaderPage text="Explore" subtext="and search" color={"#8bc34a"} />
          <HeaderSeparator />
          <HeaderPage
            text="Create"
            subtext="and collect"
            color={"#ffb74d"}
            image={img_cookbook}
          />
          <HeaderSeparator />
          <HeaderPage text="Plan" subtext="and prepare" color={"#2196f3"} />
        </div>
        <div className="right">
          <div className="menu"></div>
          <div className="avatar"></div>
        </div>
      </S.Header>
    </>
  );
};

export default Header;
