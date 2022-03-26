import React from "react";

function Aside({
  setIsSearchActive,
  searchForm,
  setSearchForm,
  locationSearch,
  locations,
  locationWeather,
}) {
  console.log(locations);

  return (
    <>
      <div className="search-aside">
        <div className="search-btn-container">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              locationSearch();
            }}
          >
            <svg id="search-icon" className="search-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              <path d="M0 0h24v24H0z" fill="none" />
            </svg>
            <input
              type="text"
              placeholder="search location"
              className="search_location"
              value={searchForm}
              onChange={() => setSearchForm(event.target.value)}
            />
            <button className="submit-search-btn" type="submit">
              Search
            </button>
          </form>
        </div>
        <ul className="result-list">
          {locations.map((city, index) => {
            return (
              <li
                className="result"
                key={index}
                onClick={() => locationWeather(city.woeid)}
              >
                {city.title}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Aside;
