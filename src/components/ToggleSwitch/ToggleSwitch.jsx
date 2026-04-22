import { useContext, useState, useRef } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext,
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef(null);

  const handleAnimation = () => {
    setIsAnimating(true);
  };

  const handleTransitionEnd = (e) => {
    if (e.propertyName === "transform") {
      setIsAnimating(false);
    }
  };

  return (
    <label
      className={`toggle-switch ${isAnimating ? "toggle-switch_animating" : ""}`}
    >
      <input
        onChange={() => {
          handleToggleSwitchChange();
          handleAnimation();
        }}
        type="checkbox"
        className="toggle-switch__checkbox"
      />
      <span
        className="toggle-switch__slider"
        onTransitionEnd={handleTransitionEnd}
      ></span>
      <span className="toggle-switch__text toggle-switch__text_f">F</span>
      <span className="toggle-switch__text toggle-switch__text_c">C</span>
    </label>
  );
}
