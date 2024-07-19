import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import './LoginPage.css'

export const LoginPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [error, setError] = useState("");

  const { signIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisplayError(false);

    try {
      const res = await signIn(formData);
      if (res.error) {
        setError(res.error);
        setDisplayError(true);
        setTimeout(() => {
          setDisplayError(false);
        }, 3000);
      }
    } catch (error) {
      setError(error.message);
      setDisplayError(true);
      setTimeout(() => {
        setDisplayError(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="container3">
      <h1 className="title3">Sign In</h1>
      <form onSubmit={handleSubmit} className="form3">
        <input
          type="email"
          placeholder="Email"
          className="input3"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input3"
          id="password"
          onChange={handleChange}
          required
        />
        <button disabled={loading} className="button3">
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      {displayError && <p className="error-message3">{error}</p>}

      <div className="footer3">
        <p className="footer-text3">
          Don't have an account?{" "}
          <Link to="/signup">
            <span >Sign Up</span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
