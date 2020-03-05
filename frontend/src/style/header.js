import styled from "styled-components";
import { darken, transparentize } from "polished";
import "@style/header.scss";

export const S = {
  HeaderPage: styled.div`
    color: ${props => props.color};

    &:hover {
      text-shadow: 0px 0px 15px ${props => transparentize(0.1, props.color)};
      color: ${props => darken(0.25, props.color)};
    }
  `,
  Header: styled.div``
};
