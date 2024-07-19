import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import { WeatherContextProvider } from "./context/weatherContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WeatherContextProvider>
        <App />
      </WeatherContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
