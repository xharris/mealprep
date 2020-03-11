import React, { useState, useEffect } from "react";

import ReactMapboxGl, {
  Cluster,
  Marker,
  RotationControl,
  ZoomControl
} from "react-mapbox-gl";

import img_map_marker from "@image/map_marker.png";
import "@style/map.scss";
import Thumbnail from "./thumbnail";

const DISABLE_MAP = false;

var MapBox, DeadMapBox;

if (!DISABLE_MAP) {
  MapBox = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: true
  });

  DeadMapBox = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
    interactive: false
  });
}

// x - long, y - lat
export const latAdd = (lat, height, y) => (lat / 180 + y / height) * 180;
export const longAdd = (long, width, x) => (long / 360 + x / width) * 360;

const ClusterMarker = props => {
  return (
    <Marker
      className="f-cluster-marker"
      key={props.coordinates.toString()}
      coordinates={props.coordinates}
    >
      <Thumbnail
        src={props.events.reduce((acc, e) => acc.concat(e.img_url), [])}
        type="rounded outlined"
      />
    </Marker>
  );
};

const factory = (coordinates, point_count, getLeaves) => {
  return (
    <ClusterMarker
      key={coordinates.toString()}
      coordinates={coordinates}
      events={getLeaves(4).map(cm => cm.props.events[0])}
    />
  );
};

const MapContent = props => {
  return (
    <Cluster ClusterMarkerFactory={factory}>
      {props.events.map((e, i) => (
        <ClusterMarker key={i} coordinates={e.geolocation} events={[e]} />
      ))}
    </Cluster>
  );
};

const Map = props => {
  const parseCoord = c => c.slice().reverse();

  const [map, setMap] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [center, setCenter] = useState(props.center);
  const [zoom, setZoom] = useState([props.zoom]);
  const [centerChanged, setCenterChanged] = useState(false);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    if (props.center) {
      setCenterChanged(true);
      setCenter(parseCoord(props.center));
    }
  }, [props.center]);

  useEffect(() => {
    if (props.onLoad) props.onLoad(map);
  }, [map]);

  // map bounds change
  const boundsEvent = _map => {
    if (!_map) _map = map;
    setBounds(_map != null ? _map.getBounds() : bounds);
  };

  useEffect(() => {
    if (props.events)
      setEvents(
        props.events.map(e => ({
          ...e,
          geolocation: parseCoord(e.geolocation)
        }))
      );
  }, [props.events]);

  useEffect(() => {
    props.onBoundsChanged && bounds && props.onBoundsChanged(bounds, center);
  }, [bounds]);

  useEffect(() => {
    boundsEvent();
  }, [center, map]);

  useEffect(() => {
    setZoom([props.zoom]);
  }, [props.zoom]);

  // DEV : HIDE MAP
  useEffect(() => {
    if (DISABLE_MAP) setBounds("all");
  });
  if (DISABLE_MAP) {
    return (
      <div
        className="f-map"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "gray"
        }}
      >
        MAP
      </div>
    );
  }
  return props.interactive ? (
    <MapBox
      className="f-map"
      style="mapbox://styles/mapbox/streets-v11"
      center={center || undefined}
      zoom={zoom}
      movingMethod={props.fly_transition && centerChanged ? "flyTo" : "jumpTo"}
      renderChildrenInPortal={true}
      onStyleLoad={(map, e) => {
        setMap(map);
        // get user's center for when a default center isn't set
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          if (props.onGeoLoad) props.onGeoLoad([longitude, latitude]);
          if (!center) setCenter([longitude, latitude]);
        });
      }}
      onDrag={boundsEvent}
      onZoom={boundsEvent}
      onPitch={boundsEvent}
      onRotate={boundsEvent}
      onResize={boundsEvent}
      onMoveEnd={props.onMoveEnd}
    >
      {props.controls && (
        <>
          <ZoomControl position={"top-left"} />
          <RotationControl position={"top-left"} />
        </>
      )}
      {events && <MapContent events={events} />}
    </MapBox>
  ) : (
    <DeadMapBox
      className="f-map"
      style="mapbox://styles/mapbox/streets-v11"
      center={center || undefined}
      zoom={zoom}
      movingMethod={props.fly_transition && centerChanged ? "flyTo" : "jumpTo"}
      onStyleLoad={(map, e) => {
        setMap(map);
        if (props.events)
          setEvents(
            props.events.map(e => ({
              ...e,
              geolocation: parseCoord(e.geolocation)
            }))
          );
        // get user's center for when a default center isn't set
        navigator.geolocation.getCurrentPosition(position => {
          const { latitude, longitude } = position.coords;
          if (props.onGeoLoad) props.onGeoLoad([longitude, latitude]);
          if (!center) setCenter([longitude, latitude]);
        });
      }}
      onMoveEnd={props.onMoveEnd}
    >
      {events && <MapContent events={events} />}
    </DeadMapBox>
  );
};

Map.defaultProps = {
  zoom: 10,
  interactive: true,
  onMoveEnd: () => {}
};

export default Map;
