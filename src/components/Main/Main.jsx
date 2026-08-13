import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  isLoggedIn,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!weatherData || !weatherData.temp) {
    return <p>Loading...</p>;
  }

  const displayTemp = weatherData.temp[currentTemperatureUnit];

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(displayTemp)}&deg; {currentTemperatureUnit} / You
          may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  isLoggedIn={isLoggedIn}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
