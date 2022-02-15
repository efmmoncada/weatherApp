/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import DayCard from "./dayWeatherCard";

const WeatherPage = (props) => {
  const styles = css`
    width: 100%;
    height: 100%;
    margin: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      color: ${props.darkMode ? "#eeeeeecc" : "black"};
    }

    .forecast-card-container {
      padding: 25px;

      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: 23%;
      gap: 1rem;
      overflow-x: auto;
      overscroll-behavior-inline: contain;
      scroll-snap-type: inline mandatory;
      scroll-padding-inline: 1rem;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none; /* Firefox */
    }

    .forecast-card-container::-webkit-scrollbar {
      display: none;
    }
  `;

  return (
    <div className='content' css={styles}>
      <h2>{props.city}</h2>
      <div className='forecast-card-container'>
        {props.forecast.map((weatherObj) => {
          let date = weatherObj.dt;
          return (
            <DayCard
              key={date}
              darkMode={props.darkMode}
              date={date}
              lowTemp={Math.round(weatherObj.temp.min)}
              highTemp={Math.round(weatherObj.temp.max)}
              percip={weatherObj.pop}
              description={weatherObj.weather[0].description}
              iconCode={weatherObj.weather[0].icon}
            />
          );
        })}
      </div>
    </div>
  );
};

export default WeatherPage;
