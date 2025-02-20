import React, { useEffect, useState } from "react";
import "../styles/ForgotPasswordPage.css";

const ForgotPasswordPage = ({ isOpen, onClose, onSignInClick }) => {
  const [email, setEmail] = useState("");
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

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Reset link has been sent to your email.");
      } else {
        setMessage(data.message || "Failed to send reset link. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Failed to send reset link. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="small-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="Forgotform-wrapper">
          <h2>Forgot Password</h2>
          {message && <p>{message}</p>}
          <form id="forgot-password-form" onSubmit={handleForgotPassword}>
            <label htmlFor="email">Enter your email</label>
            <input
              type="email" id="email" name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}required
            />
            <button type="submit" className="send">Send Reset Link</button>
            <p>Remembered your password? <a href="#" onClick={(e) => { e.preventDefault(); onSignInClick(); }}>Sign In</a></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
