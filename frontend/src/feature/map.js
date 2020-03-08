import React from "react";

import styled from "styled-components";

const S = {
  Map: styled.div`
    width: ${props => (props.width == null ? "100%" : props.width)};
    height: ${props => (props.height == null ? "100%" : props.height)};
    background-color: #eeeeee;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
};

const Map = props => {
  return (
    <S.Map className="f-map" {...props}>
      EVENTS_MAP
    </S.Map>
  );
};

export default Map;
