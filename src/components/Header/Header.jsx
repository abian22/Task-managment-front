import React, { useState } from "react";
import settings from "../../assets/settingsIcon.svg";
import calendar from "../../assets/calnedarIcon.svg";
import { logout } from "../../services/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./Header.css"

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const navigate = useNavigate()

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };



  const handleLogout = async () => {
    localStorage.removeItem("token");
        navigate("/signin");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        border: "1px solid",
        boxSizing: "border-box",
        backgroundColor: "lightblue",
        position:"absolute",
        width:"100%",
        left:"0px",
        top:"0px"
      }}
    >
      <Link to="/calendar"  style={{ textDecoration: 'none', color: 'inherit' }}> 
      <img
        src={calendar}
        alt="Calendar Icon"
        style={{ marginLeft: "10px", cursor: "pointer" }}
      />
      </Link>
      <Link to="/home"   style={{ textDecoration: 'none', color: 'inherit' }}>
      <span style={{ marginTop: "5px" }}><b>My projects</b></span>
      </Link>
     

      <img
        src={settings}
        alt="Settings Icon"
        style={{ marginLeft: "10px", cursor: "pointer" }}
        onClick={toggleMenu}
      />

      {menuVisible && (
        <div
          style={{
            position: "absolute",
            top: "40px", 
            right: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
             <Link to="/profile"  style={{ textDecoration: 'none', color: 'inherit' }}>
          <div
         className="menu-item"
            onClick={() => {
              setMenuVisible(false);
            }}
          >
         
            Profile
          </div>
            </Link>
         
          <div
            style={{
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
             handleLogout();
             setMenuVisible(false); 
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
