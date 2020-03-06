import React from "react";
import { S } from "@style/header";

import { Link } from "react-router-dom";

import img_world from "@image/world.png";
import img_cookbook from "@image/cookbook.png";
import img_calendar from "@image/calendar.png";
import img_logo from "@front/logo48.png";

const HeaderPage = props => {
  return (
    <S.NavLink
      to={props.to}
      className="hide-link header-page"
      activeClassName="on-page"
      {...props}
    >
      <S.HeaderPage {...props}>
        <div className="subcontainer">
          <div className="text">{props.text}</div>
          <div className="subtext">{props.subtext}</div>
        </div>
        {props.image && <img src={props.image} alt="" />}
      </S.HeaderPage>
      <div className="bg"></div>
    </S.NavLink>
  );
};

const HeaderSeparator = () => <div className="header-separator" />;

const Header = () => {
  return (
    <div className="header">
      <Link to={"/"} className="logo-link">
        <img className="logo" src={img_logo} alt="" />
      </Link>
      <div className="pages-container">
        <HeaderPage
          text="Explore"
          subtext="and search"
          color={"#8bc34a"}
          image={img_world}
          to={"/explore"}
        />
        <HeaderSeparator />
        <HeaderPage
          text="Create"
          subtext="and collect"
          color={"#ffb74d"}
          image={img_cookbook}
          to={"/create"}
        />
        <HeaderSeparator />
        <HeaderPage
          text="Plan"
          subtext="and prepare"
          color={"#2196f3"}
          image={img_calendar}
          to={"/plan"}
        />
      </div>
      <div className="right">
        <div className="menu"></div>
        <div className="avatar"></div>
      </div>
    </div>
  );
};

export default Header;
