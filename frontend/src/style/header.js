import styled from "styled-components";
import { rgba, darken, transparentize } from "polished";
import "@style/header.scss";

import { NavLink } from "react-router-dom";

export const S = {
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
