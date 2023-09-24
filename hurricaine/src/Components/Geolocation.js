import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGeolocated } from "react-geolocated";

const Geolocation = () => {
  const [weatherIconUrl, setWeatherIconUrl] = useState("");
  const [weatherCondition, setWeatherCondition] = useState("");
  const [locationCity, setLocationCity] = useState("");
  const [locationRegion, setLocationRegion] = useState("");

  const { coords, timestamp, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(()=>{
      if (isGeolocationAvailable && isGeolocationEnabled && coords) {
        axios.post('https://8656-23-228-186-78.ngrok-free.app/weather', {
          "latitude": coords.latitude,
          "longitude": coords.longitude
        })
        .then(function (response) {
          console.log(response);
          setLocationCity(response.location.name);
          setLocationRegion(response.location.region);
          setWeatherCondition(response.current.condition.text);
          setWeatherIconUrl(response.current.condition.icon);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }, [])

  return (
    <div>
      <div>
        <img src={`https:${weatherIconUrl}`} alt={weatherCondition} />
        <p>{weatherCondition}</p>
      </div>
      <div>{locationCity}, {locationRegion}</div>
    </div>
  )
};

export default Geolocation;
