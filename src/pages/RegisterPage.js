import React, { useState , useEffect } from "react";
import "../styles/RegisterPage.css";

const RegisterPage = ({ isOpen, onClose, onSignInClick }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.className === "modal-overlay") {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [onClose]);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registration successful! Please sign in.");
        setEmail("");
        setUsername("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Registration failed. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="small-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="Registerform-wrapper">
          <h2>Create Account</h2>
          {message && <p>{message}</p>}
          <form id="register-form" onSubmit={handleRegister}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="send">Register</button>
          </form>
          <p>
            Already have an account? <button className="sign-in-btn" onClick={onSignInClick}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
