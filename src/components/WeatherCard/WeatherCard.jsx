import { useContext } from "react";
import "./WeatherCard.css";
import { weatherOptions, normalizeCondition } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  if (!weatherData) {
    return <p>Loading weather...</p>;
  }

  const { temp, condition, isNight } = weatherData;

  const normalizedCondition = normalizeCondition(condition);

  const weatherOption = weatherOptions.find(
    (option) =>
      option.condition === normalizedCondition && option.day === !isNight,
  );

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayTemp = weatherData.temp[currentTemperatureUnit];

  if (weatherData?.temp === undefined) return <div>Loading temperature...</div>;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(displayTemp)}&deg; {currentTemperatureUnit}
      </p>

      <img
        src={weatherOption?.url}
        alt={condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
