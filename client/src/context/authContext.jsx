import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const BASE_URL = `http://localhost:3000`;

  const signIn = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const data = await response.json();
      const { user, token } = data;
      const { favorites } = user.favorites;

      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token", token);

      setUser(user, token, favorites);

      return data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signUp = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/api/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem("User", JSON.stringify(user));
      localStorage.setItem("Token", token);

      setUser(user);

      return data;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("User");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, user, signUp, handleLogout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
