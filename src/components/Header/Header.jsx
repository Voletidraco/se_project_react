import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink className="header__nav-link" to="/">
        <img className="header__logo" src={logo} alt="WTWR" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>
      <div className="header__content-container">
        <ToggleSwitch />
        {isLoggedIn && (
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
        )}
      </div>
      {isLoggedIn && currentUser ? (
        <NavLink className="header__nav-link" to="/profile">
          <div className="header__user-container">
            <p className="header__user-name">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <p className="header__avatar header__avatar_placeholder">
                {currentUser.name ? currentUser.name[0].toUpperCase() : "?"}
              </p>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Sign Up
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onLoginClick}
          >
            Log In
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
