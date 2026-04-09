import "./WeatherCard.css";
import { weatherOptions, normalizeCondition } from "../../utils/constants";

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

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.round(temp)}&deg; F</p>

      <img
        src={weatherOption?.url}
        alt={condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
