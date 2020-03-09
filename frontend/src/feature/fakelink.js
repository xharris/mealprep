import React from "react";

import "@style/fake-link.scss";

const FakeLink = props => (
  <div className="f-fake-link" title={props.title} onClick={props.onClick}>
    {props.text}
  </div>
);

export default FakeLink;
