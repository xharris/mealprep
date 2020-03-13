import React, { useState, useEffect } from "react";

import ReactMapboxGl, {
  Cluster,
  Marker,
  Layer,
  Feature,
  RotationControl,
  ZoomControl
} from "react-mapbox-gl";

import img_map_marker from "@image/map_marker.png";
import "@style/map.scss";
import Thumbnail from "./thumbnail";

const marker_img = new Image();
marker_img.src = img_map_marker;

const DISABLE_MAP = true;

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

const MapMarkers = props => {
  useEffect(() => {
    console.log(props.markers);
  }, [props.markers]);
  return [
    props.events && (
      <Cluster key={"cluster"} ClusterMarkerFactory={factory}>
        {props.events.map((e, i) => (
          <ClusterMarker key={i} coordinates={e.geolocation} events={[e]} />
        ))}
      </Cluster>
    ),
    <Layer
      key={"layer"}
      type="symbol"
      id="marker"
      layout={{
        "icon-image": "map-marker",
        "icon-anchor": "bottom",
        "icon-allow-overlap": true
      }}
      images={["map-marker", marker_img]}
    >
      {props.markers &&
        props.markers.map(m => <Feature key={m.id} coordinates={m.center} />)}
    </Layer>
  ];
};

const MapSearch = props => {
  // https://api.mapbox.com/geocoding/v5/mapbox.places/lecture%20hall%201.json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&proximity=-76.8396%2C39.1181

  const [search, setSearch] = useState(null);
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        setResults([]);
        setSearchTimeout(null);
      }, [250])
    );
  }, [search]);

  useEffect(() => {
    if (!searchTimeout && search && search.length > 1) {
      // perform search
      const q = `https://api.mapbox.com/geocoding/v5/mapbox.places/${search.replace(
        /\s/g,
        "%20"
      )}.json?access_token=${
        process.env.REACT_APP_MAPBOX_TOKEN
      }&proximity=${props.proximity.join("%2C")}`;

      fetch(q)
        .then(res => res.json())
        .then(data => setResults(data.features));
    }
  }, [searchTimeout]);

  return (
    <div className="map-search">
      <div className="input-container">
        <i className="material-icons">search</i>
        <input
          type="text"
          className="input"
          onChange={e => setSearch(e.target.value.trim())}
        />
      </div>
      <div className="results">
        {results.map(r => (
          <div
            key={r.id}
            className="result-container"
            onClick={() => {
              props.onChange && props.onChange(r);
              setResults([]);
            }}
          >
            <i className="material-icons">location_on</i>
            <span>{r.place_name}</span>
          </div>
        ))}
      </div>
    </div>
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
  const [userLocation, setUserLocation] = useState([]);

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

  const searchChange = c => {
    setZoom([18]);
    setCenter(c.center);
    props.search(c);
  };

  return (
    <div className="f-map">
      {[
        props.interactive ? (
          <MapBox
            key={"map"}
            className="map"
            style="mapbox://styles/mapbox/streets-v11"
            center={center || undefined}
            zoom={zoom}
            movingMethod={
              props.fly_transition && centerChanged ? "flyTo" : "jumpTo"
            }
            renderChildrenInPortal={true}
            onStyleLoad={(map, e) => {
              setMap(map);
              // get user's center for when a default center isn't set
              navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([longitude, latitude]);
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
            {props.controls && [
              <ZoomControl position={"top-left"} />,
              <RotationControl position={"top-left"} />
            ]}
            {(events || props.markers) && (
              <MapMarkers events={events} markers={props.markers} />
            )}
          </MapBox>
        ) : (
          <DeadMapBox
            key={"map"}
            className="f-map"
            style="mapbox://styles/mapbox/streets-v11"
            center={center || undefined}
            zoom={zoom}
            movingMethod={
              props.fly_transition && centerChanged ? "flyTo" : "jumpTo"
            }
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
            {(events || props.markers) && (
              <MapMarkers events={events} markers={props.markers} />
            )}
          </DeadMapBox>
        ),

        props.search && (
          <MapSearch
            key={"search"}
            onChange={searchChange}
            proximity={userLocation}
          />
        )
      ]}
    </div>
  );
};

Map.defaultProps = {
  zoom: 10,
  interactive: true,
  onMoveEnd: () => {}
};

export default Map;
