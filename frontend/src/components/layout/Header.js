import React from "react";
import "./Header.css";
import { useNavigate,useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };
  const showLogoutIcon = !(location.pathname === "/register" || location.pathname === "/");

  return (
    <header className="header">
      <nav className="navbar">
        <img src="/ttlogo.png" alt="ttlogo" className="logo" /> 
        <a href="https://www.turkcell.com.tr/tr/hakkimizda" target="_blank" rel="noopener noreferrer">Hakkında</a>
        <a href="https://www.turkcell.com.tr/tr/hakkimizda/iletisim"  target="_blank" rel="noopener noreferrer">İletişim</a>
        {showLogoutIcon && (
          <button className="logout-button" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt logout-icon"></i>
        </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
