import React from "react";

import { NavLink, Link } from "react-router-dom";

import img_world from "@image/world.png";
import img_calendar from "@image/calendar.png";
import img_logo from "@front/logo48.png";

import styled from "styled-components";
import { rgba, darken, transparentize } from "polished";
import "@style/header.scss";

const S = {
  NavLink: styled(NavLink)`
    &.on-page .bg {
      background-color: ${props => rgba(props.color, 0.1)};
    }
    &.on-page > div,
    &:hover > div {
      text-shadow: 0px 0px 15px ${props => transparentize(0.1, props.color)};
      color: ${props => darken(0.25, props.color)};
    }
  `,
  HeaderPage: styled.div`
    color: ${props => props.color};
  `
};

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
    <div className="f-header">
      <Link to={"/"} className="logo-link">
        <img className="logo" src={img_logo} alt="" />
      </Link>
      <div className="pages-container">
        <HeaderPage
          text="Everyone"
          subtext="public events"
          color={"#2196f3"}
          image={img_world}
          to={"/events/global"}
        />
        <HeaderSeparator />
        <HeaderPage
          text="Me"
          subtext="events involving you"
          color={"#8bc34a"}
          image={img_calendar}
          to={"/events/me"}
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
