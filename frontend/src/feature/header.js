import React, { useContext, useState } from "react";

import { NavLink, Link } from "react-router-dom";
import authContext from "@db/authContext";

import Thumbnail from "@feature/thumbnail";
import FakeLink from "@feature/fakelink";
import Modal from "@feature/modal";
import Form from "@feature/form";

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

const HeaderPage = props => (
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

const Separator = () => <div className="separator" />;

const Header = () => {
  const { user } = useContext(authContext);

  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const onLoginSubmit = e => {};
  const onSignUpSubmit = e => {};

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
        <Separator />
        <HeaderPage
          text="Me"
          subtext="events involving you"
          color={"#8bc34a"}
          image={img_calendar}
          to={"/events/me"}
        />
      </div>
      <div className="right">
        {user ? (
          <>
            <div className={`menu ${avatarMenuOpen ? "expanded" : ""}`}>
              {avatarMenuOpen &&
                ["edit profile", "logout"].map(m => (
                  <FakeLink
                    key={m}
                    className="item"
                    text={m}
                    onClick={() => console.log("open " + m)}
                  />
                ))}
            </div>
            <Thumbnail
              className="avatar"
              src={user.img_url}
              type={"rounded"}
              onClick={() => {
                setAvatarMenuOpen(!avatarMenuOpen);
              }}
            />
          </>
        ) : (
          <>
            <FakeLink
              className="login"
              text={"Login"}
              onClick={() => setLoginModalOpen(true)}
            />
          </>
        )}
      </div>
      <Modal
        className="modal-login"
        is_open={loginModalOpen}
        title={
          <div className="modal-login-title">
            <FakeLink
              className={showSignUp ? "" : "selected"}
              text={"Login"}
              onClick={() => setShowSignUp(false)}
            ></FakeLink>
            <Separator />
            <FakeLink
              className={showSignUp ? "selected" : ""}
              text={"Create an account"}
              onClick={() => setShowSignUp(true)}
            ></FakeLink>
          </div>
        }
        onClose={() => setLoginModalOpen(false)}
      >
        {showSignUp ? (
          <Form
            onSubmit={onSignUpSubmit}
            className="form-signup"
            inputs={[
              { type: "email", label: "Email:", name: "email", required: true },
              {
                type: "text",
                label: "Display Name:",
                name: "display_name",
                required: true
              },
              {
                type: "tel",
                label: "Phone Number:",
                name: "phone",
                pattern: `\\(?[0-9]{3}\\)?[\\-\\s]?[0-9]{3}[\\-\\s]?[0-9]{4}`
              },
              {
                type: "password",
                label: "Password:",
                name: "password",
                required: true
              },
              {
                type: "password",
                label: "Retype your password:",
                name: "password2",
                required: true
              },
              { type: "submit" }
            ]}
          />
        ) : (
          <Form
            onSubmit={onLoginSubmit}
            className="form-login"
            inputs={[
              { label: "Email:", type: "email", name: "email", required: true },
              {
                label: "Password:",
                type: "password",
                name: "password",
                required: true
              },
              { type: "submit" }
            ]}
          />
        )}
      </Modal>
    </div>
  );
};

export default Header;
