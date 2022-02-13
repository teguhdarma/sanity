
import * as React from 'react';

import Map, {Marker} from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZXdld2V3ZXdld2UiLCJhIjoiY2t3eDIwcG9uMDk2dTJwcGxqYzJ2MzhzaSJ9.qFQt6Jwt196usn4540WQDQ'; // Set your mapbox token here

export default function App() {
  return (
    <div>
      

      <Map
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14
        }}
        style={{width: 800, height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <Marker longitude={-122.4} latitude={37.8} color="red" />
      </Map>
    </div>
  );
}