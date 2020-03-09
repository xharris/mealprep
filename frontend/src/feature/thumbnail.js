import React from "react";

import styled from "styled-components";
import "@style/thumbnail.scss";

const S = {
  Thumbnail: styled.div`
    background-image: url(${props => props.src});
  `
};

const Thumbnail = props => <S.Thumbnail className="f-thumbnail" {...props} />;

export default Thumbnail;
