import React, { useState, useEffect } from "react";

import ReactMapboxGl, {
  Layer,
  Feature,
  RotationControl,
  ZoomControl
} from "react-mapbox-gl";

import img_map_marker from "@image/map_marker.png";
import "@style/map.scss";

const MapBox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

const img = new Image();
img.src = img_map_marker;
const marker_images = ["map-marker", img];
const layer_layout = { "icon-image": "map-marker" };

const Map = props => {
  const [center, setCenter] = useState(props && props.center);
  const [centerChanged, setCenterChanged] = useState(false);

  useEffect(() => {
    if (props.center) {
      setCenterChanged(true);
      setCenter(props.center.reverse());
    }
  }, [props.center]);

  return (
    <MapBox
      className="f-map"
      style="mapbox://styles/mapbox/streets-v11"
      center={center || [-100.909736, 39.147391]}
      movingMethod={props.fly_transition && centerChanged ? "flyTo" : "jumpTo"}
      onStyleLoad={() => {
        // get user's center if a default center isn't set
        if (!center)
          navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setCenter([longitude, latitude]); // it's reversed for MapBox
          });
      }}
    >
      {props.controls && (
        <>
          <ZoomControl position={"top-left"} />
          <RotationControl position={"top-left"} />
        </>
      )}
      {props.events && (
        <Layer
          type="symbol"
          id="marker"
          layout={layer_layout}
          images={marker_images}
        >
          {props.events.map(e => (
            <Feature key={e.id} coordinates={e.geolocation.reverse()} />
          ))}
        </Layer>
      )}
    </MapBox>
  );
};

Map.defaultProps = {
  zoom: 5
};

export default Map;
