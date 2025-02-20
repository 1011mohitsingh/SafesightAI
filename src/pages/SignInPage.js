import React, { useState, useEffect } from "react";
import "../styles/SignInPage.css";
import { useNavigate } from "react-router-dom"; // For navigation
import { useToast } from "../contexts/ToastContext";


const SignInPage = ({ isOpen, onClose, onRegisterClick, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook for navigation
  const { showToast } = useToast(); // Use toast context

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

  if (!isOpen) return null;

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending sign-in request to the server...");
      const res = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error('Failed to authenticate. Server responded with an error.');
      }

      const data = await res.json();

      // Close the modal
      onClose();

      // Show a toast message
      showToast(`Welcome back, ${data.username}!`);

      // Redirect to the home page after login
      navigate("/"); // Redirect to home page

    } catch (error) {
      console.error('Error:', error);
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>

        <div className="auth-left">
          <div className="branding">
            <img
              src="/logofinal.png"
              alt="SafeSightAI Logo"
              style={{ width: "200px", height: "auto" }}
            />
            <p className="slogan">"Turning Vision Into Action for a Safer World"</p>
          </div>
        </div>

        <div className="auth-right">
          <div className="form-wrapper">
            <h2>Welcome Back!</h2>
            <p>
              Sign in to continue enhancing safety with <strong>SafeSight-AI</strong>.
            </p>
            {message && <p>{message}</p>}
            <form id="auth-form" onSubmit={handleSignIn}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  id="toggle-password"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", color: "#007bff" }}
                >
                  {passwordVisible ? "Hide" : "Show"}
                </span>
              </div>

              <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); onForgotPasswordClick(); }}>
                Forgot password?
              </a>
              <button type="submit" className="btn-primary">
                Sign In
              </button>
            </form>
            <div className="divider">
              <span>OR</span>
            </div>

            <p className="signup-link">
              New here?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); onRegisterClick(); }} >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;