import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_APPID;
const geolocationEndpoint = process.env.REACT_APP_GEO_ENDPOINT;
const weatherEndpoint = process.env.REACT_APP_WEATHER_ENDPOINT;
const monthlyEndpoint = process.env.REACT_APP_MONTHLY_ENDPOINT;

const units = "imperial";

const useWeather = (city) => {
  const count = 10;

  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();
    async function fetchResults() {
      let responseBody = {};
      setLoading(true);
      try {
        const loc_rec_url = `${geolocationEndpoint}q=${city}&appid=${API_KEY}`;

        let response = await fetch(loc_rec_url, {
          signal: controller.signal,
        });
        responseBody = await response.json();
        const { lat, lon } = responseBody[0];

        const forecast_url = `${weatherEndpoint}lat=${lat}&lon=${lon}&cnt=${count}&units=${units}&appid=${API_KEY}`;
        // const forecast_url = `${monthlyEndpoint}lat=${lat}&lon=${lon}&cnt=${30}&units=${units}&appid=${API_KEY}`;

        response = await fetch(forecast_url, {
          signal: controller.signal,
        });
        responseBody = await response.json();
      } catch (e) {
        if (e instanceof DOMException) {
          console.log("HTTP request aborted");
        } else {
          setError(true);
          throw e;
        }
      }
      if (!ignore) {
        setForecast(responseBody || {});
        setError(false);
        setLoading(false);
      }
    }

    if (city) {
      fetchResults();
    }

    return () => {
      controller.abort();
      ignore = true;
    };
  }, [city]);

  return [forecast, loading, error];
};

export default useWeather;
