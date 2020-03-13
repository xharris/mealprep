import React from "react";

import { getTag } from "@db";

import "@style/tag.scss";

const Tag = props => {
  const { value } = getTag(props.id);
  const text = value.length > 50 ? value.slice(0, 50) + "..." : value;
  return (
    <div title={value} className="f-tag">
      {"#" + text}
    </div>
  );
};

export const TagList = props => {
  return (
    <div className="f-tag-list">
      {props.list.map(t => (
        <Tag key={t} id={t} />
      ))}
    </div>
  );
};
