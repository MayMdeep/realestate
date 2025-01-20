import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import GridViewIcon from "@mui/icons-material/GridView";
import PersonIcon from "@mui/icons-material/Person";
import google from '../../assets/google-analytics.png';
import LockIcon from "@mui/icons-material/Lock";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();

  // Adjust padding based on sidebar state
  useEffect(() => {
    const contentElement = document.querySelector(".content");
    if (isOpen && !isLoginPage) {
      contentElement.style.paddingLeft = "210px";
    } else {
      contentElement.style.paddingLeft = "0";
    }
  }, [isOpen, isLoginPage]);

  return (
    <>
      <div className={`menu ${isOpen ? "" : "hidden"}`}>
        {isOpen && (
          <button onClick={toggleSidebar} className="toggle-button-open">
            <ArrowCircleLeftIcon sx={{ color: "white !important" }} />
          </button>
        )}
        <div className="logo">
          <img className="logosidebar" src={logo} alt="logo" />
        </div>
        <div className="menu--list">
          <Link to="/metrics" className="item">
            <span>
              <GridViewIcon className="icon" sx={{ fontSize: "22px", marginRight: "9px" }} />
              Dashboard
            </span>
          </Link>
          <Link to="/users" className="item">
            <span>
              <PersonIcon className="icon" sx={{ fontSize: "22px", marginRight: "9px" }} />
              Users
            </span>
          </Link>
          <Link to="/analytics" className="item">
      <span>
        {/* Replace PersonIcon with the Google Analytics logo */}
        <img
          src={google} // Use the imported image
          alt="Google Analytics Logo" // Add alt text for accessibility
          className="icon" // Apply the same class for consistent styling
          style={{ width: "28px", height: "22px", marginRight: "9px" }} // Adjust size and spacing
        />
        Google Analytics
      </span>
    </Link>
          <Link to="/logs" className="item">
            <span>
              <LockIcon className="icon" sx={{ fontSize: "22px", marginRight: "9px" }} />
              Activity Logs
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;