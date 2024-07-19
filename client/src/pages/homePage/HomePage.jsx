import coldbg from "../../assets/cold.jpg";
import hotbg from "../../assets/hot.jpg";
import Descriptions from "../../components/Descriptions";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { WeatherContext } from "../../context/weatherContext";
import "./HomePage.css";
import { AuthContext } from "../../context/authContext";

export const HomePage = () => {
  const [city, setCity] = useState("paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotbg);
  const [error, setError] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { getWeather, handleFavorite } = useContext(WeatherContext);
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const data = await getWeather(city, units);
        setWeather(data);

        const threshold = units === "metric" ? 20 : 60;
        setBg(data.temp <= threshold ? coldbg : hotbg);
        setError(null);
      } catch (error) {
        setError("City not found!!");
        setTimeout(() => setError(null), 1300);
      }
    };

    fetchWeatherData();
  }, [units, city]); // Removed bg from dependencies

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);
    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  const handleFav = () => {
    if (weather) {
      handleFavorite(weather.name);
    }
  };

  return (
    <>
      {error && <div className="error-popup">{error}</div>}
      <div className="app2" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay2">
          {user && (
            <div className="user-dropdown-container">
              <div className="user-dropdown">
                <h3 onClick={() => setDropdownVisible(!dropdownVisible)}>
                  Hello {user.username} ▼
                </h3>
                {dropdownVisible && (
                  <div className="dropdown-menu">
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                )}
              </div>
            </div>
          )}

          {weather && (
            <div className="container2">
              <div className="section2 section__inputs2">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City..."
                />
                <div className="buttons2">
                  <button onClick={handleFav} aria-label="Add to favorites">
                    ❤️
                  </button>
                  <button onClick={() => navigate("/fav")}>Go to fav</button>

                  <button onClick={(e) => handleUnitsClick(e)}>°F</button>
                </div>
              </div>
              <div className="section2 section__temperature2">
                <div className="icon2">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature2">
                  <h1>{`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
              </div>
              <Descriptions weather={weather} units={units} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
