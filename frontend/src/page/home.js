import React, { useEffect, useState } from "react";

import { getEvents } from "@db";

import Body from "@feature/body";
import Header from "@feature/header";
import Map from "@feature/map";

import "@style/home.scss";

const Home = () => {
  const [center] = useState(null);
  const [moving, setMoving] = useState(false);
  const [transition, setTransition] = useState("jumpTo");
  const [map, setMap] = useState(null);
  const events = getEvents();

  const moveMap = dt => {
    setMoving(true);
    requestAnimationFrame(moveMap);
  };

  useEffect(() => {
    if (center && map && !moving) moveMap(0);
  }, [center, map]);

  return (
    <div className="p-home">
      <Header />
      <Body>
        <Map
          zoom={8}
          events={events}
          interactive={false}
          center={center}
          movingMethod={transition}
          onLoad={map => setMap(map)}
          onGeoLoad={_center => {
            if (!center) {
              setTransition("easeTo");
            }
          }}
        />
      </Body>
    </div>
  );
};

export default Home;
