import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Weather from "./Weather";
import Aside from "./Aside";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchForm, setSearchForm] = useState("");
  const [weatherState, setWeatherState] = useState([]);
  const [isCelsiusActive, setIsCelsiusActive] = useState(true);
  const [locations, setLocations] = useState([]);
  const [size, setSize] = useState(window.innerWidth);

  const url = "https://www.metaweather.com/api/location/";

  const currentLocationWeather = (url) => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://cors-anywhere.herokuapp.com/${url}search/?lattlong=${position.coords.latitude},${position.coords.longitude}`
        );
        const data = await response.json();

        const weatherResponse = await fetch(
          `https://cors-anywhere.herokuapp.com/${url}${data[0].woeid}/`
        );

        const weatherInfo = await weatherResponse.json();

        if (weatherInfo) {
          const { consolidated_weather, title, time } = weatherInfo;
          setWeatherState({ consolidated_weather, title, time });
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    });
  };

  const locationSearch = async (query) => {
    const url = `https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${searchForm}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data) {
      setLocations(data);
    } else setLocations(false);
  };

  const locationWeather = async (woeid) => {
    setIsLoading(true);
    const weatherResponse = await fetch(
      `https://cors-anywhere.herokuapp.com/${url}${woeid}/`
    );

    const weatherInfo = await weatherResponse.json();
    console.log(weatherInfo);

    if (weatherInfo) {
      const { cons       olidated_weather, title, time } = weatherInfo;
      setWeatherState({ consolidated_weather, title, time });
    }
    setIsLoading(false);
    setIsSearchActive(false);
  };

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    currentLocationWeather(url);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkSize);
  }, []);

  useEffect(() => {}, [isSearchActive]);

  const { consolidated_weather, title, time } = weatherState;

  if (isLoading) {
    return (
      <main className="loading-wrapper">
        <div className="loading-ring"></div>
      </main>
    );
  }
  if (!isSearchActive) {
    return (
      <main className="app">
        {
          <aside className="aside">
            <div className="btn-container">
              <button
                className=" search-btn"
                onClick={() => {
                  setIsSearchActive(true);
                }}
              >
                Search for places
              </button>
              <button className="fix-search-btn">
                <span className="material-icons">
                  <i
                    className="material-icons icon"
                    onClick={() => currentLocationWeather(url)}
                  >
                    gps_fixed
                  </i>
                </span>
              </button>
            </div>
            <div className="weather-img">
              <img
                className="todays-weather-bg"
                src="\Cloud-background.png"
                alt=""
              />
              {consolidated_weather ? (
                <img
                  src={`${consolidated_weather[0].weather_state_name
                    .split(" ")
                    .join("")}.png`}
                  alt=""
                  className="todays-weather"
                />
              ) : (
                <img src="" alt="" />
              )}
            </div>
            <div className="aside-info">
              <h1 className="weather-degree">
                {isCelsiusActive
                  ? Math.round(consolidated_weather[0].the_temp)
                  : Math.round((consolidated_weather[0].the_temp * 9) / 5 + 32)}
                <span>{isCelsiusActive ? "℃" : "℉"}</span>
              </h1>
              <h2 className="weather-state">
                {consolidated_weather
                  ? `${consolidated_weather[0].weather_state_name}`
                  : "default text"}
              </h2>
              <div className="weather-info">
                <h4>
                  Today <span className="dot">•</span>
                  {`
                    ${new Date().toLocaleString("default", {
                      weekday: "short",
                    })},
                    ${new Date().getDate()}
                    ${new Date().toLocaleString("default", {
                      month: "short",
                    })}`}
                </h4>
                <div className="location">
                  <span className="material-icons location-icon">
                    location_on
                  </span>
                  <h3>{title}</h3>
                </div>
              </div>
            </div>
          </aside>
        }
        <Weather
          consolidated_weather={consolidated_weather}
          setIsCelsiusActive={setIsCelsiusActive}
          isCelsiusActive={isCelsiusActive}
        ></Weather>
      </main>
    );
  }
  if (isSearchActive && size > 900) {
    return (
      <main className="app">
        <Aside
          searchForm={searchForm}
          setSearchForm={setSearchForm}
          locationSearch={locationSearch}
          locations={locations}
          locationWeather={locationWeather}
        ></Aside>
        <Weather
          consolidated_weather={consolidated_weather}
          setIsCelsiusActive={setIsCelsiusActive}
          isCelsiusActive={isCelsiusActive}
        ></Weather>
      </main>
    );
  }
  if (isSearchActive && size <= 900) {
    return (
      <main className="app">
        <Aside
          searchForm={searchForm}
          setSearchForm={setSearchForm}
          locationSearch={locationSearch}
          locations={locations}
          locationWeather={locationWeather}
        ></Aside>
      </main>
    );
  }
}

export default App;
