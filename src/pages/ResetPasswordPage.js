import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import hooks for params and navigation
import "../styles/ResetPasswordPage.css";

const ResetPasswordPage = ({ isOpen, onClose, onSignInOpen}) => {
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password has been reset successfully.");
        // Close the current modal and open the sign-in modal after a short delay
        setTimeout(() => {
          onClose();
          onSignInOpen();
          navigate("/login")
        }, 1000); // 1-second delay
      } else {
        setMessage(data.message || "Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("Failed to reset password. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="small-container">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <div className="ResetPasswordform-wrapper">
          <h2>Reset Password</h2>
          {message && <p>{message}</p>}
          <form id="reset-password-form" onSubmit={handleResetPassword}>
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="send">Reset Password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
