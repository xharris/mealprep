import React, { useEffect } from "react";

import { withRouter } from "react-router-dom";
import { getEvent } from "@db";

import Body from "@feature/body";
import Map, { latAdd } from "@feature/map";
import Header from "@feature/header";
import { TagList } from "@feature/tag";
import Thumbnail from "@feature/thumbnail";

import "@style/eventview.scss";

const EventList = withRouter(props => {
  const event = getEvent(props.match.params.eventid);
  return (
    <div className="p-event-view">
      <Header />
      <Body>
        <div className="body-left">
          <Thumbnail src={event.img_url} />
          <Map
            center={event.geolocation.slice().reverse()}
            zoom={13}
            interactive={false}
          />
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
          <div className="description">{event.description}</div>
          <TagList
            list={[
              "popcorn",
              "free",
              "interactive",
              "SEB",
              "Birds of Prey and the Fantabulous Emancipation of one Harley Quinn"
            ]}
          />
        </div>
      </Body>
    </div>
  );
});

export default EventList;
