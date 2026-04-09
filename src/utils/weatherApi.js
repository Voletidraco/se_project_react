export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export const filterWeatherData = (data) => {
  return {
    city: data.name,
    temp: data.main.temp,
    type: data.main.temp >= 86 ? "hot" : data.main.temp >= 66 ? "warm" : "cold",

    // 👇 keep these for WeatherCard icons
    condition: data.weather[0].main,
    isNight: data.dt < data.sys.sunrise || data.dt > data.sys.sunset,
  };
};
