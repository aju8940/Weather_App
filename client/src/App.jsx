import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/authContext";
import { SignupPage } from "./pages/SignupPage/SignupPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { LoginPage } from "./pages/loginPage/LoginPAge";
import { Fav } from "./pages/favorites/fav";

export const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/login" element={user ? <HomePage /> : <LoginPage />} />
        <Route path="/signup" element={user ? <HomePage /> : <SignupPage />} />
        <Route path="/fav" element={user ? <Fav/> : <LoginPage/>} />
      </Routes>
    </BrowserRouter>
  );
};
