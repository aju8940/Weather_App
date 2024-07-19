import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Fav.css";
import coldbg from "../../assets/cold.jpg";
import { WeatherContext } from "../../context/weatherContext";

export const Fav = () => {
  const navigate = useNavigate();
  const { getAllFavorites, removeFavorite } = useContext(WeatherContext); 
  const [favoriteCities, setFavoriteCities] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getAllFavorites();
        setFavoriteCities(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, []);

  const handleRemove = async (city) => {
    try {
      await removeFavorite(city); 
      setFavoriteCities((prev) => prev.filter((fav) => fav.name !== city));
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <>
      <button className="back-button" onClick={() => navigate("/")}>
        Go Back
      </button>
      <div
        className="fav-container"
        style={{ backgroundImage: `url(${coldbg})` }}
      >
        <div className="overlay">
          <h2>Favorite Cities</h2>
          {favoriteCities.length > 0 ? (
            <div className="fav-table-container">
              <table className="fav-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Wind Speed</th>
                    <th>Weather Conditions</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {favoriteCities.map((city, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{city.name}</td>
                      <td>{city.country}</td>
                      <td>{city.temp} °{city.units === "metric" ? "C" : "F"}</td>
                      <td>{city.humidity}%</td>
                      <td>{city.speed} m/s</td>
                      <td>{city.description}</td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => handleRemove(city.name)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2>No Cities Added</h2>
          )}
        </div>
      </div>
    </>
  );
};
