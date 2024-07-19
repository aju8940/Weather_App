import { createContext, useState, useContext } from "react";
import { AuthContext } from "./authContext";

export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const BASE_URL = `http://localhost:3000`;

  const getWeather = async (city, units = "metric") => {
    try {
      const response = await fetch(`${BASE_URL}/api/weather/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city: city.toLowerCase(), units }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch weather data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  };

  const handleFavorite = async (city) => {
    try {
      const response = await fetch(`${BASE_URL}/api/weather/add-to-fav`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          city: city.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add to favorites");
      }

      alert("Added to favorites");
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };



  const getAllFavorites = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/weather/get-fav?userId=${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch favorites");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching all favorites:", error);
      throw error;
    }
  };

 
  const removeFavorite = async (city) => {
    try {
      const response = await fetch(`${BASE_URL}/api/weather/remove-from-fav`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          city: city.toLowerCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove from favorites");
      }

      alert("Removed from favorites");
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };



  return (
    <WeatherContext.Provider
      value={{ getWeather, handleFavorite, getAllFavorites,removeFavorite }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
