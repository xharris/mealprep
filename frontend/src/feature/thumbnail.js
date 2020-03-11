import React from "react";

import styled from "styled-components";
import "@style/thumbnail.scss";

const S = {
  Thumbnail: styled.div`
    grid-template-columns: repeat(
      ${props => (Array.isArray(props.src) ? props.src.length : 1)},
      1fr
    );
  `,
  Image: styled.div`
    background-image: url(${props => props.src});
  `
};

const Thumbnail = props => (
  <S.Thumbnail className={`f-thumbnail ${props.type || "square"}`} {...props}>
    {Array.isArray(props.src) ? (
      props.src.map((src, i) => <S.Image className="image" key={i} src={src} />)
    ) : (
      <S.Image className="image" src={props.src} />
    )}
  </S.Thumbnail>
);

export default Thumbnail;
