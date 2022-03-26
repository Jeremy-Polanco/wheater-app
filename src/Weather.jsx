import React from "react";
import { useEffect, useState } from "react";

function Weather({
  consolidated_weather,
  setIsCelsiusActive,
  isCelsiusActive,
}) {
  const windDirections = {
    1: "N",
    2: "NNE",
    3: "NE",
    4: "ENE",
    5: "E",
    6: "ESE",
    7: "SE",
    8: "SSE",
    9: "S",
    10: "SSW",
    11: "SW",
    12: "WSW",
    13: "W",
    14: "WNW",
    15: "NW",
    16: "NNW",
    17: "N",
  };
  return (
    <section className="weather-container">
      <div className="wrapper">
        <div className="temperature-btn-container">
          <button
            className={isCelsiusActive ? "active-btn" : "celsius-btn"}
            onClick={() => {
              setIsCelsiusActive(true);
            }}
          >
            ℃
          </button>
          <button
            className={isCelsiusActive ? "fahrenheit-btn" : "active-btn"}
            onClick={() => {
              setIsCelsiusActive(false);
            }}
          >
            ℉
          </button>
        </div>

        <div className="weather-past">
          {consolidated_weather
            .filter((item, index) => index !== 0)
            .map((weatherOfTheDay, index) => {
              return (
                <div className="weather-history" key={index}>
                  <p className="history-title">
                    {index === 0
                      ? "Tomorrow"
                      : `${new Date(
                          weatherOfTheDay.applicable_date
                        ).toLocaleString("default", {
                          weekday: "short",
                        })},
                        ${new Date(weatherOfTheDay.applicable_date).getDate()}
                        ${new Date(
                          weatherOfTheDay.applicable_date
                        ).toLocaleString("default", {
                          month: "short",
                        })}
                        
                      `}
                  </p>
                  <img
                    src={`${weatherOfTheDay.weather_state_name
                      .split(" ")
                      .join("")}.png`}
                    alt={`${weatherOfTheDay.weather_state_name}`}
                    className="history-img"
                  />
                  <div className="temperature-container">
                    <span className="higher-temp">
                      {`${
                        isCelsiusActive
                          ? Math.round(weatherOfTheDay.max_temp)
                          : Math.round((weatherOfTheDay.max_temp * 9) / 5 + 32)
                      }${isCelsiusActive ? "℃" : "℉"}`}
                    </span>
                    <span className="lower-temp">
                      {`${
                        isCelsiusActive
                          ? Math.round(weatherOfTheDay.max_temp)
                          : Math.round((weatherOfTheDay.max_temp * 9) / 5 + 32)
                      }${isCelsiusActive ? "℃" : "℉"}`}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
        <h2 className="title"> Today's Highlights</h2>
        <div className="today-weather">
          <div className="weather-stats">
            <div className="status">
              <p className="status-title">Wind status</p>
              <p className="status-info">
                {`${Math.floor(consolidated_weather[0].wind_speed)}`}
                <span>mph</span>
              </p>
              <div className="extra-info">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"></path>
                </svg>
                {
                  windDirections[
                    Math.round(45 / consolidated_weather[0].wind_direction) + 1
                  ]
                }
              </div>
            </div>
          </div>
          <div className="weather-stats">
            <div className="status">
              <p className="status-title">Humidity</p>
              <p className="status-info">
                {`${consolidated_weather[0].humidity}`}
                <span id="percentage">%</span>
              </p>

              <div className="extra-info">
                <div className="humidity-bar-container">
                  <div className="humidity-percentages">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                  <div className="humidity-gauge-bar">
                    <span
                      className="measure"
                      style={{ width: `${consolidated_weather[0].humidity}%` }}
                    ></span>
                    <div className="percentage-sing">
                      <span>%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="weather-stats">
            <div className="status">
              <p className="status-title">Visibility</p>
              <p className="status-info">
                {`${Math.floor(consolidated_weather[0].visibility)},${(
                  consolidated_weather[0].visibility % 1
                )
                  .toFixed(1)
                  .replace("0.", "")} `}
                <span>miles </span>
              </p>
            </div>
          </div>
          <div className="weather-stats">
            <div className="status">
              <p className="status-title">Air Pressure</p>
              <p className="status-info">
                {Math.round(consolidated_weather[0].air_pressure)}
                <span>mb</span>
              </p>
            </div>
          </div>
        </div>
        <footer className="footer">
          Created by <span className="username">Jeremy Polanco</span> -
          devChallenges.io
        </footer>
      </div>
    </section>
  );
}

export default Weather;
