import React, { useContext, useState } from "react";

import { NavLink, Link, withRouter } from "react-router-dom";
import authContext from "@db/authContext";

import Thumbnail from "@feature/thumbnail";
import FakeLink from "@feature/fakelink";
import { SignInModal } from "@feature/signin";
import { ProfileModal } from "@feature/profile";

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

const Header = withRouter(props => {
  const { user } = useContext(authContext);

  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <div className="f-header">
      <Link to={"/"} className="logo-link">
        <img className="logo" src={img_logo} alt="" />
      </Link>
      {!props.nolinks && (
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
            to={user ? "/events/me" : "/signin"}
          />
        </div>
      )}
      {!props.noavatar && (
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
                      onClick={() => {
                        setProfileModalOpen(true);
                        setAvatarMenuOpen(false);
                      }}
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
      )}
      <SignInModal
        is_open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
      <ProfileModal
        is_open={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
      />
    </div>
  );
});

export default Header;
