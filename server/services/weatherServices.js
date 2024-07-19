import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const makeIconUrl = (iconId) =>
  `https://openweathermap.org/img/wn/${iconId}@2x.png`;

export const getWeatherData = async (city, units = "metric") => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

  try {
    const response = await axios.get(URL);
    const weatherData = response.data;

    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys: { country },
      name,
    } = weatherData;

    const { description, icon } = weather[0];

    return {
      description,
      temp,
      temp_max,
      temp_min,
      pressure,
      speed,
      country,
      name,
      feels_like,
      humidity,
      iconURL: makeIconUrl(icon),
    };
  } catch (error) {
    console.error("Failed to fetch or save weather data:", error);
    throw error;
  }
};


export const addToFavorite = async (userId, city) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const favorites = user.favorites || [];
    if (!favorites.includes(city)) {
      favorites.push(city);
    }

    await prisma.user.update({
      where: { id: userId },
      data: { favorites },
    });

    return { message: "Added to favorites" };
  } catch (error) {
    console.error("Failed to add city to favorites:", error);
    throw new Error("Failed to add city to favorites");
  }
};

export const getFavorites = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const favorites = user.favorites || [];

    const weatherData = await Promise.all(
      favorites.map(async (city) => {
        try {
          return await getWeatherData(city);
        } catch (error) {
          console.error(`Failed to fetch weather for city: ${city}`, error);
          return null;
        }
      })
    );

    const filteredWeatherData = weatherData.filter((data) => data !== null);

    return filteredWeatherData;
  } catch (error) {
    console.error("Failed to fetch favorite cities", error);
    throw new Error('Failed to fetch favorite cities');
  }
};


export const removeFromFavorite = async (userId, city) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    let favorites = user.favorites || [];
    favorites = favorites.filter(favoriteCity => favoriteCity !== city);

    await prisma.user.update({
      where: { id: userId },
      data: { favorites },
    });

    return { message: "Removed from favorites" };
  } catch (error) {
    console.error("Failed to remove city from favorites:", error);
    throw new Error("Failed to remove city from favorites");
  }
};
