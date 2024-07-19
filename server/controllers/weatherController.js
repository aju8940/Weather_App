import { getWeatherData, addToFavorite,getFavorites,removeFromFavorite } from "../services/weatherServices.js";

export const getWeather = async (req, res, next) => {
  try {
    const { city } = req.body;
    const units = req.query.units || "metric";
    const weather = await getWeatherData(city, units);
    res.status(200).json(weather);
  } catch (error) {
    next(error);
  }
};

export const addToFav = async (req, res, next) => {
  try {
    const { userId, city } = req.body;
    const response = await addToFavorite(userId, city);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const removeFromFav = async (req, res, next) => {
  try {
    const { userId, city } = req.body;
    const response = await removeFromFavorite(userId,city)
    res.status(200).json(response)
  } catch (error) {
    next(error);
  }
};

export const getFavsWeather = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const response = await getFavorites(userId)
    res.status(200).json(response)
  } catch (error) {
    next(error);
  }
};
