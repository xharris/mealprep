/**
 * /events/global
 * /events/me
 */
import React from "react";

import { withRouter } from "react-router-dom";
import { getEvent } from "@db";

import Header from "@feature/header";
import Body from "@feature/body";
import Map from "@feature/map";
import Search from "@feature/search";
import EventCard from "@feature/eventcard";

import "@style/eventlist.scss";

const EventList = withRouter(props => {
  const events = [getEvent("1"), getEvent("2"), getEvent("3")];
  return (
    <div className="p-event-list">
      <Header />
      <Body>
        <div className="body-left">
          <Map />
        </div>
        <div className="body-right">
          <Search />
          <div className="event-card-list">
            {events.map(e => (
              <EventCard type="horizontal" event={e} />
            ))}
          </div>
        </div>
      </Body>
    </div>
  );
});

export default EventList;
