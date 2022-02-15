/** @jsxImportSource @emotion/react */

import React, { useContext, useState } from "react";
import { css } from "@emotion/react";

import useWeather from "./hooks/useWeather";
const Search = (props) => {
  const searchIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      x='0px'
      y='0px'
      width='40'
      height='40'
      viewBox='0 0 50 50'
      css={css`
        fill: ${props.darkMode ? "white" : "#000000"};
      `}
    >
      <path d='M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z'></path>
    </svg>
  );

  const styles = css`
    display: flex;

    input {
      width: 600px;
      height: 65px;
      border-radius: 15px;
      background-color: ${props.darkMode ? "#eeeeee77" : "white"};
      font-size: 25px;
      text-indent: 10px;
      border: none;
    }

    input:focus {
      outline: none;
    }

    button {
      width: 10%;
      border: none;
      background-color: transparent;
    }
  `;

  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.updateCity(city);
  };

  const updateSearchVal = (e) => {
    setCity(e.target.value);
  };

  return (
    <div css={styles} className='search-input'>
      <input
        onKeyDown={(e) => {
          if (e.code == "Enter") handleSubmit(e);
        }}
        onChange={updateSearchVal}
        type='text'
        placeholder='City,State,Country'
      />

      <button onClick={handleSubmit} className='submit'>
        {searchIcon}
      </button>
    </div>
  );
};

export default Search;
