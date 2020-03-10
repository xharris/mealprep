import React, { useState, useEffect } from "react";

import ReactMapboxGl, {
  Layer,
  Cluster,
  Marker,
  Feature,
  RotationControl,
  ZoomControl,
  MapContext
} from "react-mapbox-gl";

import img_map_marker from "@image/map_marker.png";
import "@style/map.scss";
import Thumbnail from "./thumbnail";

const styles = {
  clusterMarker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#51D5A0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    border: "2px solid #56C498",
    cursor: "pointer"
  },
  marker: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    backgroundColor: "#E0E0E0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "2"
  }
};

var MapBox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: true
});

var DeadMapBox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
  interactive: false
});

// x - long, y - lat
export const latAdd = (lat, height, y) => (lat / 180 + y / height) * 180;
export const longAdd = (long, width, x) => (long / 360 + x / width) * 360;

const img = new Image();
img.src = img_map_marker;
const marker_images = ["map-marker", img];
const layer_layout = {
  "icon-image": "map-marker",
  "icon-anchor": "bottom",
  "icon-allow-overlap": true
};

var user_loc = null;

// get user's center for when a default center isn't set
navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude, longitude } = position.coords;
    user_loc = [longitude, latitude]; // it's reversed for MapBox
  },
  () => {
    user_loc = [0, 0];
  }
);

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

  // user's current location is found. center there unless the map has already been changed
  useEffect(() => {
    if (!centerChanged) {
      setCenter(user_loc);
    }
  }, [user_loc]);

  // map bounds change
  const boundsEvent = _map => {
    if (!_map) _map = map;
    setBounds(_map != null ? _map.getBounds() : bounds);
  };

  useEffect(() => {
    props.onBoundsChanged && bounds && props.onBoundsChanged(bounds);
  }, [bounds]);

  useEffect(() => {
    boundsEvent();
  }, [center, map]);

  useEffect(() => {
    setZoom([props.zoom]);
  }, [props.zoom]);

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

  const MapContent = props => (
    <Cluster ClusterMarkerFactory={factory}>
      {events.map((e, i) => (
        <ClusterMarker key={i} coordinates={e.geolocation} events={[e]} />
      ))}
    </Cluster>
  );
  return props.interactive ? (
    <MapBox
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
      }}
      onDrag={boundsEvent}
      onZoom={boundsEvent}
      onPitch={boundsEvent}
      onRotate={boundsEvent}
      onResize={boundsEvent}
    >
      {props.controls && (
        <>
          <ZoomControl position={"top-left"} />
          <RotationControl position={"top-left"} />
        </>
      )}
      {events && <MapContent />}
    </MapBox>
  ) : (
    <DeadMapBox
      className="f-map"
      style="mapbox://styles/mapbox/streets-v11"
      center={center || undefined}
      zoom={zoom}
      onStyleLoad={() => {
        if (props.events)
          setEvents(
            props.events.map(e => ({
              ...e,
              geolocation: parseCoord(e.geolocation)
            }))
          );
      }}
    >
      {events && <MapContent />}
    </DeadMapBox>
  );
};

Map.defaultProps = {
  zoom: 10,
  interactive: true
};

export default Map;
