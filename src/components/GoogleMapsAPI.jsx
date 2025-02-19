import React, { useEffect, useRef, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const MAP_ID = "f7c7c711bda89c6f";

const GoogleMapsAPI = ({ lat, lng }) => {
  const center = { lat: lat, lng: lng };
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const newMap = new google.maps.Map(mapRef.current, {
        center,
        zoom: 15,
        mapId: MAP_ID,
      });

      setMap(newMap);
    }
  }, [mapRef, map]);

  useEffect(() => {
    if (map && !markerRef.current && google.maps.marker) {
      markerRef.current = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: center,
      });
    }
  }, [map]);

  return <div ref={mapRef} style={containerStyle} />;
};

export default GoogleMapsAPI;
