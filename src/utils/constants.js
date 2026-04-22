export const weatherOptions = [
  {
    day: true,
    condition: "clear",
    url: new URL("../assets/day/clear.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "cloudy",
    url: new URL("../assets/day/cloudy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "foggy",
    url: new URL("../assets/day/foggy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "rainy",
    url: new URL("../assets/day/rainy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "snowy",
    url: new URL("../assets/day/snowy.svg", import.meta.url).href,
  },
  {
    day: true,
    condition: "stormy",
    url: new URL("../assets/day/stormy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "clear",
    url: new URL("../assets/night/clear.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "cloudy",
    url: new URL("../assets/night/cloudy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "foggy",
    url: new URL("../assets/night/foggy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "rainy",
    url: new URL("../assets/night/rainy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "snowy",
    url: new URL("../assets/night/snowy.svg", import.meta.url).href,
  },
  {
    day: false,
    condition: "stormy",
    url: new URL("../assets/night/stormy.svg", import.meta.url).href,
  },
];

export const apiKey = "157e5078640ee4258436b650dcb842d9";

export const normalizeCondition = (condition) => {
  switch (condition) {
    case "Clear":
      return "clear";
    case "Clouds":
      return "cloudy";
    case "Rain":
      return "rainy";
    case "Thunderstorm":
      return "stormy";
    case "Snow":
      return "snowy";
    case "Mist":
    case "Fog":
    case "Haze":
      return "foggy";
    default:
      return "clear";
  }
};

export const coordinates = {
  latitude: 40.7128,
  longitude: -74.006,
};
