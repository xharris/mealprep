import React, { useEffect, useState } from "react";

import { wrapX } from "@front/util";

import { getEvents } from "@db";

import Body from "@feature/body";
import Header from "@feature/header";
import Map from "@feature/map";

import "@style/home.scss";
import { transparentize } from "polished";

const Home = () => {
  const [center, setCenter] = useState(null);
  const [moving, setMoving] = useState(false);
  const [transition, setTransition] = useState("jumpTo");
  const [map, setMap] = useState(null);
  const events = getEvents();

  const moveMap = dt => {
    setMoving(true);
    // map.panTo([wrapX(center[1] + 0.00001 * dt, 0, 180), center[0]], {
    //   duration: 0
    // });

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
