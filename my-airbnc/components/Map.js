import * as React from "react";
import mapboxgl from "mapbox-gl";
import Map, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { getCenter } from "geolib";
import { Result } from "postcss";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGVndWhkYXJtYSIsImEiOiJja3psNjRneWsxNHQ1Mm5ueXh2dThpY2xuIn0.EOP9mO-H8NKTAW6jcvX7KQ"; // Set your mapbox token here

export default function App({select}) {
    const coordinates = select.data.map(data=>({
        longitude:data.result_object.longitude,
        longitude:data.result_object.latitude,

    }))
  return (
    <div>
      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 11,
        }}

        style={{ width: 600, height:"100%" }}
        mapStyle="mapbox://styles/teguhdarma/ckzl67xvt000q15qmhvsxh85j"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
        <Popup
          longitude={-122.4}
          latitude={37.8}
          offset={{
            "bottom-left": [12, -38],
            bottom: [0, -38],
            "bottom-right": [-12, -38],
          }}
        >
          <h1>japan</h1>
        </Popup>
      </Map>
    </div>
  );
}
