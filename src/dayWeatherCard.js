/** @jsxImportSource @emotion/react */

import React, { useState } from "react";
import { css } from "@emotion/react";

const upArrow = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='25'
    height='25'
    viewBox='0 0 172 172'
    css={css`
      fill: #000000;
    `}
  >
    <g
      fill='none'
      fillRule='nonzero'
      stroke='none'
      strokeWidth='1'
      strokeLinecap='butt'
      strokeLinejoin='miter'
      strokeMiterlimit='10'
      strokeDasharray=''
      strokeDashoffset='0'
      fontFamily='none'
      fontWeight='none'
      fontSize='none'
      textAnchor='none'
      css={css`
        mix-blend-mode: normal;
      `}
    >
      <path d='M0,172v-172h172v172z' fill='none'></path>
      <g fill='#2ecc71'>
        <path d='M86,10.75l50.16667,57.33333h-100.33333z'></path>
        <path d='M68.08333,60.91667h35.83333v93.16667h-35.83333z'></path>
      </g>
    </g>
  </svg>
);

const downArrow = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width='25'
    height='25'
    viewBox='0 0 172 172'
    css={css`
      fill: #000000;
    `}
  >
    <g
      fill='none'
      fillRule='nonzero'
      stroke='none'
      strokeWidth='1'
      strokeLinecap='butt'
      strokeLinejoin='miter'
      strokeMiterlimit='10'
      strokeDasharray=''
      strokeDashoffset='0'
      fontFamily='none'
      fontWeight='none'
      fontSize='none'
      textAnchor='none'
      css={css`
        mix-blend-mode: normal;
      `}
    >
      <path d='M0,172v-172h172v172z' fill='none'></path>
      <g fill='#e74c3c'>
        <path d='M86,157.66667l-50.16667,-57.33333h100.33333z'></path>
        <path d='M68.08333,14.33333h35.83333v93.16667h-35.83333z'></path>
      </g>
    </g>
  </svg>
);

const DayCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const cardStyles = css`
    /* width: 10%; */
    height: 80%;
    padding: 10px;
    background-color: ${props.darkMode ? "#eeeeee77" : "white"};
    margin: 10px;
    display: grid;
    grid-template-rows: ${expanded ? "25% 25% 25% 25%" : "20% 80%"};
    grid-template-columns: ${expanded ? "1fr 1fr" : "100%"};
    border-radius: 15px;
    box-shadow: 5px 7px #aaaaaaee;
    align-items: center;
    justify-items: center;
    transition: all ease-in-out 0.3s;
    scroll-snap-align: start;

    &:hover {
      transform: scale(1.1);
    }

    img {
      ${expanded ? "display: none;" : ""}
      width: 80%;
      height: 80%;
      object-fit: contain;
      grid-row: ${expanded ? "2 / span 1" : "2"};
      grid-column: ${expanded ? "1 / span 2" : "1"};
      justify-self: center;
    }

    .date {
      font-size: 1.5em;
      font-weight: bold;
      grid-row: 1;
      grid-column: 1 ${expanded ? "/ span 2" : ""};
    }

    .temp {
      grid-row: 2 / span 1;
      grid-column: 1 / span 2;

      display: flex;
      justify-content: flex-end;
    }

    .percip {
      grid-row: 3 / span 1;
      grid-column: 1 / span 2;
    }

    .description {
      width: 100%;
      grid-row: 4 / span 1;
      grid-column: 1 / span 2;
      text-align: center;
    }
  `;

  const expandCard = () => {
    setExpanded(!expanded);
  };

  let date = new Date(props.date * 1000);

  return (
    <div className='card' css={cardStyles} onClick={expandCard}>
      <p className='date'>{date.toDateString()}</p>
      {!expanded && (
        <img
          src={`http://openweathermap.org/img/wn/${props.iconCode}@2x.png`}
          alt='weather icon'
        />
      )}
      {expanded && (
        <>
          <div className='temp'>
            {downArrow}
            {props.lowTemp} ºF
            {upArrow}
            {props.highTemp} ºF
          </div>
          <div className='percip'>
            <b>Chance of Rain:</b> {Math.round(props.percip * 100)}%
          </div>
          <div className='description'>{props.description}</div>
        </>
      )}
    </div>
  );
};

export default DayCard;
