/**
 * /events/global
 * /events/me
 */
import React, { useState, useEffect, useContext } from "react";

import { withRouter, Redirect } from "react-router-dom";
import { getEvents, getUserEvents } from "@db";
import authContext from "@db/authContext";

import Header from "@feature/header";
import Body from "@feature/body";
import Map from "@feature/map";
import Search from "@feature/search";
import EventCard from "@feature/eventcard";
import Button from "@feature/button";

import "@style/button.scss";
import "@style/eventlist.scss";

const EventList = withRouter(props => {
  const { user } = useContext(authContext);
  const [events, setEvents] = useState([]);

  const [zoom, setZoom] = useState(9);
  const [currLoc, setCurrLoc] = useState(null);
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    if (!user) {
      props.history.push("/events/global");
    }
  }, []);

  useEffect(() => {
    const route = props.location.pathname;
    if (route.startsWith("/events/me") && user) {
      setEvents(getUserEvents({ user_id: user.id }));
    } else setEvents(getEvents());
  }, [props.location, user ? user.id : user]);

  return user == null && props.location.pathname.startsWith("/events/me") ? (
    <Redirect to="/events/global" />
  ) : (
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
                (bounds === "all" ||
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
        <Button className="btn-create rounded" to="/create">
          <i className="material-icons">add</i>
        </Button>
      </Body>
    </div>
  );
});

export default EventList;
