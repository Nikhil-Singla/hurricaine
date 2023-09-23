import React from "react";
import { useGeolocated } from "react-geolocated";

const Geolocation = () => {
    const { coords, timestamp, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
      <div>
        Your latitude: {coords.latitude}<br/>
        Your longitude: {coords.longitude}<br/>
        Your current timestamp: {timestamp}
      </div>
    ) : (
        <div>Getting the location data&hellip; </div>
    );
};

export default Geolocation;
