import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="header">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/services">Our Services</Link>
        <Link to="/technology">Technology</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/about">About Us</Link>
        <Link to="/signin">SignIn</Link>
        {/* Remove or comment out the following line */}
        {/* <Link to="/login">Login</Link> */}
      </div>
    </nav>
  );
};

export default Header; 