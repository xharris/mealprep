import React from "react";

import { Link } from "react-router-dom";
import FakeLink from "@feature/fakelink";
import Thumbnail from "@feature/thumbnail";

import "@style/eventcard.scss";

const EventCard = props => {
  const {
    id,
    title,
    time_string,
    geo_string,
    img_url,
    geolocation
  } = props.event;
  return (
    <div className={`f-event-card ${props.type}`}>
      <div className="ec-body">
        <Thumbnail src={img_url} />
        <div className="ec-mid-body">
          <Link className="title" title={title} to={`/e/${id}`}>
            {title}
          </Link>
          <span className="time">
            <i className="material-icons">access_time</i>
            {time_string}
          </span>
          <span className="location">
            <i className="material-icons">location_on</i>
            <FakeLink
              title={props.location_title}
              onClick={() => props.onLocationClick(geo_string, ...geolocation)}
              text={geo_string}
            />
          </span>
        </div>
        <div className="ec-right-body">
          <i className="material-icons event-type">public</i>
        </div>
      </div>
    </div>
  );
};

EventCard.defaultProps = {
  onLocationClick: () => {}
};

export default EventCard;
