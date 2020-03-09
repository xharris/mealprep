import React from "react";

import "@style/tag.scss";

const Tag = props => {
  const text =
    props.text.length > 50 ? props.text.slice(0, 50) + "..." : props.text;
  return (
    <div title={props.text} className="f-tag">
      {text}
    </div>
  );
};

export const TagList = props => {
  return (
    <div className="f-tag-list">
      {props.list.map(t => (
        <Tag key={t} text={t} />
      ))}
    </div>
  );
};
