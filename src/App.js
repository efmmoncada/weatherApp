/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { Global, css } from "@emotion/react";
import useWeather from "./hooks/useWeather.js";

import WeatherPage from "./weatherPage.js";
import Search from "./LocSearch.js";
import Spinner from "./Spinner.js";

const darkModeIcon = (
  <img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAC1ElEQVRoge3ZvWsUQRzG8c8pKiq5Rgx2UbHwpbCyEiWFpBAxWKixsLCy8h+wMAT8ByytBAVR7MQiohBEBC0ELXxDUYmIRi0UEXxL1mJyesbdvZ3L3e0G/MIPlruZuee5nZffzPCfalHr0e+MYwemMIn7uIurs58tGK4hSYlp3MFR9JWmLoJFGMaEdEMJPmEU9ZI0RjOEF7INTWGkNHWRrMQZ2WYSXLJAulsNY/LNPMT6sgTGckK+mdfYVJq6CGq4IN/MGwyUJTCGFXgp38wDC2RG2yffSIKzpamL5IbWZvaXpi6Cg1obeSVM35VmqbAgtjJzvCyBMZzX2sgUljdXWtRbjYW4WaBMPw51W8h82ab1G0lwvSyBRRlQzMhPrGpUqmLXel+w3GJhs4ZqGpmOKFtpIzFpyMbGQxWNrI0ou6HxUEUjWyLKVnqwD0aUTd1BjgunHWWaW4J3ik2/Cb6mNfJl9svh7uvNZFhxE4mMqfr57JcT3debyS1xRh6lNdK8FxjquuR/2SvORILLjcrN4+Fe0/Npvc356zjVRr3UN3LY327P6M3ZcA0Xxb+NBHvSGlwjpAfNBce66WCWky3EZsV3OVnA7ZQKJ3TnzdTmYSLBlbzGj2ZUuiAc2XSKuva7UyNyz4f78DGj4kvhyGa+7JV/iF0kJoX9fS6jLRq5gQNFGmpiibDYxa4TWXFs7g+k9f06ngr74jzeCSnNLeH26S0+CDu3OtYJCeAgdmN1EccFeIKt+Fak8IjO/HOdjhnsinV+qQLC50Y7i6Y+4X6ibPGNuC1uXP7FeuF+omwTT3RgjG0S7ifKNNGxu5EB4X6ijO7UqdnuN3Wc65GBGWFgtz0mirBfWFm7ZeKxNqbYdlkhHO0XuQIoGpPCir2sVyaaWY4jwoHyzwJi58YPIYsdMc9u1Mn0fBV2Yjs2C1N3vz87zc9CWvNM2NndFPK2zx3U8J/K8AsY5IjtPnxVqwAAAABJRU5ErkJggg==' />
);

function App(props) {
  const [city, setCity] = useState("");
  const [darkMode, toggleDarkMode] = useState(false);

  const [forecast, loading, error] = useWeather(city);

  const styles = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    transition: all ease-in-out 0.3s;
    background: linear-gradient(
      ${darkMode ? "180deg" : "0deg"},
      ${darkMode ? "rgba(2,0,36,1) 0%" : "rgba(255, 255, 255, 1) 0%"},
      ${darkMode ? "rgba(3,3,45,1) 35%" : "rgba(45, 210, 253, 1) 100%"}
        ${darkMode ? ", rgba(0,212,255,1) 100%" : null}
    );

    h1 {
      color: ${darkMode ? "#eeeeeecc" : "black"};
    }

    .dark {
      position: sticky;
      right: 2rem;
      bottom: 2rem;
      background-color: transparent;
      border: none;
      align-self: flex-end;
      position: absolute;
      right: 20px;
      bottom: 20px;
    }

    .dark:hover {
      transform: scale(1.2);
    }
  `;

  return (
    <div css={styles}>
      <Global
        styles={css`
          html,
          body {
            margin: 0;
            height: 100%;
            font-family: "Nunito Sans", sans-serif;
          }
        `}
      />
      <h1>Whats the Weather??</h1>
      <Search updateCity={setCity} darkMode={darkMode} />
      {loading && <Spinner darkMode={darkMode} />}
      {Object.keys(forecast).length != 0 && !loading && (
        <WeatherPage
          city={forecast.city.name}
          forecast={forecast.list}
          darkMode={darkMode}
        />
      )}
      <button
        className='dark'
        onClick={() => {
          toggleDarkMode((prev) => !prev);
        }}
      >
        {darkModeIcon}
      </button>
    </div>
  );
}

export default App;
