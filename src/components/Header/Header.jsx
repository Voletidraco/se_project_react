import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
      </div>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__user-name">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </NavLink>
    </header>
  );
}

export default Header;
