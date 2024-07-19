import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import "./SignupPage.css";

export const SignupPage = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [displayError, setDisplayError] = useState(false);
  const [error, setError] = useState("");

  const { signUp } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDisplayError(false);

    try {
      const res = await signUp(formData);
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
    <div className="container1">
      <h1 className="title1">Sign Up</h1>
      <form onSubmit={handleSubmit} className="form1">
        <input
          type="text"
          placeholder="Username"
          className="input1"
          id="username"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="input1"
          id="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input1"
          id="password"
          onChange={handleChange}
          required
        />
        <button disabled={loading} className="button1">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {displayError && <p className="error-message1">{error}</p>}

      <div className="footer1">
        <p className="footer-text1">
          Already have an account?{" "}
          <Link to="/login">
            <span>Sign In</span>
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};
