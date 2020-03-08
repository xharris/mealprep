import React from "react";

import { withRouter } from "react-router-dom";
import { getEvent } from "@db";

import Body from "@feature/body";
import Map from "@feature/map";
import Header from "@feature/header";

import "@style/eventview.scss";

const EventList = withRouter(props => {
  const event = getEvent(props.match.params.eventid);
  return (
    <div className="p-event-view">
      <Header />
      <Body>
        <div className="body-left">
          <Map />
          <img className="thumbnail" />
        </div>
        <div className="body-right">
          <div className="title">{event.title}</div>
          <div className="date_loc">
            <span>
              <i className="material-icons">access_time</i>
              {event.time_string}
            </span>
            <span>
              <i className="material-icons">location_on</i>
              <a href="#">{event.geo_string}</a>
            </span>
          </div>
          <div>{event.description}</div>
          <div>features</div>
        </div>
      </Body>
    </div>
  );
});

export default EventList;
