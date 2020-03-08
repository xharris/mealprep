import React from "react";

import { Link } from "react-router-dom";

import "@style/eventcard.scss";

const EventCard = props => {
  const { id, title, time_string, geo_string } = props.event;
  return (
    <div id={id} className={`f-event-card ${props.type}`}>
      <div className="ec-body">
        <img className="thumbnail" />
        <div className="ec-mid-body">
          <Link className="title" to={`/e/${id}`}>
            {title}
          </Link>
          <span className="time">
            <i className="material-icons">access_time</i>
            {time_string}
          </span>
          <span className="location">
            <i className="material-icons">location_on</i>
            {geo_string}
          </span>
        </div>
        <div className="ec-right-body">
          <i className="material-icons event-type">public</i>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
