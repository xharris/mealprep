/**
 * /events/global
 * /events/me
 */
import React, { useState } from "react";

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

  const [zoom, setZoom] = useState(9);
  const [currLoc, setCurrLoc] = useState(null);
  const [bounds, setBounds] = useState(null);

  return (
    <div className="p-event-list">
      <Header />
      <Body>
        <div className="body-left">
          <Map
            center={currLoc}
            zoom={zoom}
            events={events}
            controls={true}
            fly_transition={true}
            onBoundsChanged={b => setBounds(b)}
          />
        </div>
        <div className="body-right">
          <Search />
          <div className="event-card-list">
            {events.map(e => {
              if (
                bounds &&
                (bounds == "all" ||
                  bounds.contains(e.geolocation.slice().reverse()))
              )
                return (
                  <EventCard
                    key={e.id}
                    type="horizontal"
                    event={e}
                    location_title={"center on map"}
                    onLocationClick={(loc, lat, long) => {
                      setZoom(15);
                      setCurrLoc([lat, long]);
                    }}
                  />
                );
            })}
          </div>
        </div>
      </Body>
    </div>
  );
});

export default EventList;
